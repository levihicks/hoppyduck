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

function shape(width, height, posX, posY, color){
	this.width = width;
	this.height = height;
	this.posX = posX;
	this.posY = posY;
	this.color = color;
}

function hopper(width, height, posX, posY, color){
	shape.call(this,width, height, posX, posY, color);
	this.isHopping = false;
	this.hopPeak;
}

hopper.prototype = Object.create(shape.prototype);
hopper.prototype.constructor = hopper;

var duck = new hopper(hopperWidth, hopperHeight, hopperPosX, hopperPosY, hopperColor);

var walls = [];

function getRandHeight(){
	return Math.floor(Math.random() * (450-50 + 1)) + 50;
}

for (var i = 0; i < 6; i+=2){
	var randHeight = getRandHeight();
	walls[i] = new shape(90, 500-randHeight, 900+(Math.floor(i/2)*325), 100+randHeight, "red");
	walls[i+1] = new shape(90, randHeight, 900+(Math.floor(i/2)*325), 0, "red");
}

var wallsDrawn = false;
var heightTmp;
shape.prototype.slide = function(){
	if(this.posX<-90){
		var randHeight = getRandHeight();
		 if (!wallsDrawn){
		 	this.height = 500-randHeight;
		 	heightTmp=randHeight;
		 	wallsDrawn=true;
		 }
		 else{
		 	this.height=heightTmp;
		 	wallsDrawn=false;
		 }
		if (this.posY!=0)
			this.posY = 100+randHeight;
		this.posX=900;
	}
	this.posX-=2;
}

shape.prototype.draw = function(){
	ctx.fillStyle = this.color;
	ctx.fillRect(this.posX, this.posY, this.width, this.height);
};

window.onkeydown=function(e){
	if (e.keyCode==32 && keyIsDown == false){
		keyIsDown = true;
		duck.isHopping = true;
		duck.hopPeak = duck.posY-50;
	}
};

window.onkeyup=function(e){
	if (e.keyCode==32)
		keyIsDown = false;
};

hopper.prototype.fall = function(){
	if (!this.isHopping)
		this.posY+=3;
	else if (this.posY<=this.hopPeak)
		this.isHopping=false;
	else
		this.posY-=5;
};

function loop(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, windowWidth, windowHeight);
	for (var i = 0; i < walls.length; i++){
		walls[i].slide();
		walls[i].draw();
	}
	duck.fall();
	duck.draw();

	//requestAnimationFrame(loop);
}

loop();

