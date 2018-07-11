var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

function loop(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 900, 600);
}

loop();