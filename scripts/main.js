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
		hopper1.setHop();
	}
}

window.onkeyup=function(e){
	if (e.keyCode==32){
		keyIsDown = false;
	}
}

hopper.prototype.setHop = function(){
	this.posY -= 5;

}

function loop(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, windowWidth, windowHeight);
	hopper1.draw();
	//requestAnimationFrame(loop);
}

loop();

