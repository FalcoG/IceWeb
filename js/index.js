var FebFirst = new Date(2017, 01, 01, 0, 0, 0, 0)
var unban_timer = $(".unban-time").first()

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
}

unban_timer.text(formatTime(FebFirst - $.now()))

setInterval(function() {
	unban_timer.text(formatTime(FebFirst - $.now()))
}, 1000);

