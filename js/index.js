var config = {
    api_key: 'i249p26eo0882g7svswi1won5zkeo8'
};

var formatTime = function(seconds) {
	// get total seconds between the times
	var delta = Math.abs(seconds) / 1000;

	// calculate (and subtract) whole days
	var days = Math.floor(delta / 86400);
	delta -= days * 86400;

	// calculate (and subtract) whole hours
	var hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;

	// calculate (and subtract) whole minutes
	var minutes = Math.floor(delta / 60) % 60;
	delta -= minutes * 60;

	// what's left is seconds
	var seconds = delta % 60;  // in theory the modulus is not required

	return (days + "d:" + hours + "h:" + minutes + "m:" + seconds.toString().split(".")[0] + "s")
};

var status_elem = document.getElementById('status');

function twitch_status(username){
    try {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                try{
                    var response = JSON.parse(xhr.responseText);

                    // null = not live
                    if(response.stream == null){
                        status_elem.innerHTML = '<p class="col-12">Ice Poseidon is not live</p>';
                        ban_check(username);
                    }else{
                        status_elem.innerHTML = '<p class="col-12">Ice Poseidon is live</p>';
                        document.getElementsByClassName('social-button twitch')[0].className += ' live';
                    }
                }catch(err){
                    // something went wrong
                }

            }
        };
        xhr.open('GET', 'https://api.twitch.tv/kraken/streams/' + username, true);
        xhr.setRequestHeader('Client-ID', config.api_key);
        xhr.send(null);
    }catch(err){
        console.log('Twitch API is unavailable');
    }
}

function ban_check(username){
    try {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var response = JSON.parse(xhr.responseText);

                if(response.error){
                    // status code 422 means he's banned
                    if(response.status == 422){
                        var unban_date = new Date(2017, 1, 1, 0, 0, 0, 0);

                        if(unban_date > Date.now()){ // if latest known unban date is
                            status_elem.innerHTML = '<p class="col-12">Ice Poseidon will be unbanned in</p><p class="unban-time col-12">' + formatTime(unban_date - Date.now()) + '</p>';
                            setInterval(function(){
                                status_elem.childNodes[1].innerHTML = formatTime(unban_date - Date.now());
                            }, 1000);
                        }else{
                            if(unban_date > Date.now() - 86400000){ // 1 day in milliseconds
                                
                            }else{
                                // last known unban date is greater than 1 day
                                status_elem.innerHTML = '<p class="col-12">Ice Poseidon is possibly banned</p>';
                            }
                        }
                    }
                }
            }
        };

        xhr.open('GET', 'https://api.twitch.tv/kraken/channels/' + username, true);
        xhr.setRequestHeader('Client-ID', config.api_key);
        xhr.send(null);
    }catch(err){
        console.log('Twitch API is unavailable');
    }

}

twitch_status('ice_poseidon');