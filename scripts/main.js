var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var cc = document.querySelector(".canvasContainer");
var scorePara = document.querySelector('.score');
var gameStarted = false;
var hopperWidth = 30;
var hopperHeight = 30;
var hopperPosX = 435;
var hopperPosY = 285;
var hopperColor =  "darkgreen";
var windowWidth = 900;
var windowHeight = 600;
var keyIsDown=false;
var collisionDetected = false;
var pointCount = 0;
var highScore = 0;

function shape(width, height, posX, posY, color){
	this.width = width;
	this.height = height;
	this.posX = posX;
	this.posY = posY;
	this.color = color;
}

function hopper(width, height, posX, posY, color, offset){
	shape.call(this,width, height, posX, posY, color);
	this.offset = offset;
	this.acc = 0;
	this.gravity = 1;
	this.vel = 0;
}

hopper.prototype = Object.create(shape.prototype);
hopper.prototype.constructor = hopper;
var duck = [];
duck['body'] = new hopper(hopperWidth, hopperHeight, hopperPosX, hopperPosY, hopperColor, 0); 
duck['eyeball'] = new hopper(10, 10, 455, 285, "white", 0); 
duck['pupil'] = new hopper(5, 5, 460, 287, "gray", 2); 
duck['beak'] = new hopper(20, 10, 455, 295, "yellow", 10); 

var walls = [];

function getRandHeight(){
	return Math.floor(Math.random() * (450-50 + 1)) + 50;
}

for (var i = 0; i < 6; i+=2){
	var randHeight = getRandHeight();
	walls[i] = new shape(90, 500-randHeight, 900+(Math.floor(i/2)*325), 100+randHeight, "#1f1f2e");
	walls[i+1] = new shape(90, randHeight, 900+(Math.floor(i/2)*325), 0, "#1f1f2e");
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
		hop();
	}
//	if (e.keyCode==82 && collisionDetected)
//		reload();
};

canvas.onmousedown = hop;

canvas.onmouseup = function(){
	keyIsDown=false;
}

function restartButton(){
	var btn = document.createElement("button");
	btn.setAttribute("id", "restartButton");
	btn.innerText="RESTART";
	btn.onclick = reload;
	return btn;
}

function highScoreMessage(){
	var msg = document.createElement("div");
	msg.setAttribute("class", "highScoreMessage");
	msg.innerText = "NEW HIGH SCORE!";
	return msg;
}

function charButtonClick(){
	var direction = this.id[4];
	var order = this.id[this.id.length-1];
	var nst = document.querySelector(".nameSelectTable");
	var charCell = nst.children[1].children[order-1];
	var currentCharCode = charCell.innerText.charCodeAt();
	if(direction=="U")
		var newCharCode = (currentCharCode==65)?90:currentCharCode - 1;
	else if (direction=="D")
		var newCharCode = (currentCharCode==90)?65:currentCharCode + 1;
	charCell.innerText = String.fromCharCode(newCharCode);
}

function charButton(order, direction){
	var btn = document.createElement("button");
	btn.setAttribute("id", "char"+direction+"Button"+String(order));
	btn.innerText = (direction=="Up")?"▲":"▼";
	btn.onclick=charButtonClick;
	return btn;
}

function nameSelectScreen(){
	var nameSelectTable = document.createElement("table");
	nameSelectTable.setAttribute("class", "nameSelectTable");
	var topRow = document.createElement("tr");
	var middleRow = document.createElement("tr");
	var bottomRow = document.createElement("tr");
	for(var i = 1; i < 4; i++){
		var btnCellTop = document.createElement("td");
		btnCellTop.appendChild(charButton(i,"Up"));
		var midCell = document.createElement("td");
		midCell.innerText = String.fromCharCode(65+i);
		var btnCellBottom = document.createElement("td");
		btnCellBottom.appendChild(charButton(i, "Down"));
		topRow.appendChild(btnCellTop);
		middleRow.appendChild(midCell);
		bottomRow.appendChild(btnCellBottom);
	}
	nameSelectTable.appendChild(topRow);	
	nameSelectTable.appendChild(middleRow);	
	nameSelectTable.appendChild(bottomRow);	
	return nameSelectTable;
}

function gameOverContainer(){
	var container = document.createElement("div");
	container.setAttribute("id", "gameOver");
	container.appendChild(highScoreMessage());
	container.appendChild(nameSelectScreen());
	container.appendChild(restartButton());
	return container;
}

function hop(){
	keyIsDown=true;
		for (var key in duck){
			duck[key].acc-=14;
		}
}

window.onkeyup=function(e){
	if (e.keyCode==32)
		keyIsDown = false;
};

hopper.prototype.fall = function(){
	this.acc += this.gravity;
	this.posY += this.vel;
	this.vel += this.acc;
	if(this.vel>4)
		this.vel = 4;
	if(this.vel<-14)
		this.vel=-14;
	this.acc=0;
	if((duck['body'].posY+4)>600-hopperHeight){
		this.posY = 600-hopperHeight+this.offset;
		
	}
	if((duck['body'].posY-1)<0){
		this.posY = this.offset;
	}
};



hopper.prototype.checkCollision = function(){
	var leftX = this.posX;
	var rightX = this.posX+this.width;
	var bottomY = this.posY + this.height;
	var topY = this.posY;
	for (var i = 0; i < walls.length; i++){
		var wallLeftX = walls[i].posX;
		var wallRightX = walls[i].posX+walls[i].width;
		var wallTopY = walls[i].posY;
		var wallBottomY = walls[i].posY+walls[i].height;
		if ((topY <= wallBottomY && topY>=wallTopY) ||
			(bottomY <= wallBottomY && 
			bottomY >= wallTopY)){
				if((leftX <= wallRightX && leftX>=wallLeftX) ||
					(rightX <= wallRightX && 
					rightX >= wallLeftX)){
					collisionDetected=true;
					cc.appendChild(gameOverContainer());	
				}

		}
	}
};

hopper.prototype.checkPoints = function(){
	var leftX = this.posX;
	for (var i = 0; i < walls.length; i++){
		var wallRightX = walls[i].posX+walls[i].width;
		if (leftX-wallRightX<=2 && leftX-wallRightX>=1)
			pointCount+=Math.floor(i%2);
	}
}

function reload(){
	document.getElementById("gameOver").remove();
	collisionDetected=false;
	pointCount = 0;
	wallsDrawn=false;
	for (var i = 0; i < 6; i+=2){
		var randHeight = getRandHeight();
		walls[i] = new shape(90, 500-randHeight, 900+(Math.floor(i/2)*325), 100+randHeight, "#1f1f2e");
		walls[i+1] = new shape(90, randHeight, 900+(Math.floor(i/2)*325), 0, "#1f1f2e");
	}
	duck['body'] = new hopper(hopperWidth, hopperHeight, hopperPosX, hopperPosY, hopperColor, 0);
	duck['eyeball'] = new hopper(10, 10, 455, 285, "white", 0);
	duck['pupil'] = new hopper(5, 5, 460, 287, "gray", 2);
	duck['beak'] = new hopper(20, 10, 455, 295, "yellow", 10);
	loop();
}

function getHighScore(){
	if (localStorage.getItem('highScore'))
		highScore=localStorage.getItem('highScore');
}

var backgroundImage = new Image();
backgroundImage.src="./images/background.png";
var tileUDImage = new Image();
tileUDImage.src="./images/tileUD.png";
var tileImage = new Image();
tileImage.src="./images/tile.png";

function drawWallImage(w){
	var imageX = w.posX;
	var imageY = (w.posY==0)?(805-w.height)*-1:w.posY;
	ctx.drawImage((w.posY==0)?tileUDImage:tileImage, imageX, imageY);
}

function loop(){
	ctx.drawImage(backgroundImage, 0, 0);
	for (var i = 0; i < walls.length; i++){
		walls[i].slide();
		walls[i].draw();
		drawWallImage(walls[i]);
	}
	for (var key in duck){
		duck[key].fall();
		duck[key].draw();
		if (key == 'body'||key == 'beak'){
			duck[key].checkCollision();
			if(key == 'body')
				duck[key].checkPoints();
		}
	}
	if (pointCount>highScore){
		highScore=pointCount;
		localStorage.setItem('highScore', highScore);
	}
	scorePara.textContent = "Score: " + pointCount + " // High Score: " + highScore;
	if(!collisionDetected)
		requestAnimationFrame(loop);
}

getHighScore();
loop();

