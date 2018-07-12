var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var gameStarted = false;
var hopperWidth = 30;
var hopperHeight = 30;
var hopperPosX = 435;
var hopperPosY = 285;
var hopperColor =  "#42c2f4";
var windowWidth = 900;
var windowHeight = 600;
var keyIsDown=false;
var isHopping = false;
var hopPeak;
var hopper1 = new hopper(hopperWidth, hopperHeight, hopperPosX, hopperPosY, hopperColor);

function hopper(width, height, posX, posY, color){
	this.width = width;
	this.height = height;
	this.posX = posX;
	this.posY = posY;
	this.color = color;
}

hopper.prototype.draw = function(){
	ctx.fillStyle = this.color;
	ctx.fillRect(this.posX, this.posY, this.width, this.height);
}
window.onkeydown=function(e){
	if (e.keyCode==32 && keyIsDown == false){
		keyIsDown = true;
		isHopping = true;
		hopPeak = hopper1.posY-60;
	}
}

window.onkeyup=function(e){
	if (e.keyCode==32)
		keyIsDown = false;
}

hopper.prototype.fall = function(){
	if (!isHopping)
		this.posY+=3;
	else if (this.posY<=hopPeak)
		isHopping=false;
	else
		this.posY-=20;
};



function loop(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, windowWidth, windowHeight);
	hopper1.fall();
	hopper1.draw();
	requestAnimationFrame(loop);
}

loop();

