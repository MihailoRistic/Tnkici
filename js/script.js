var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

var cp = 1;

var nop = 2;

var w = Math.floor(window.innnerWidth / 50);
var h = w;

var spots = [];
var ys = [];

function Spot(x, y){
	this.x = x;
	this.y = y;

	this.show = function(){
		c.fillStyle = "red";
		c.fillRect(this.x, this.y, 2 ,2);
	}
}

function Tank(x, y, w, h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.speed = 1;
	this.show = function(){
		c.fillStyle="red";
		c.fillRect(this.x, this.y, 20 , 20);
	}

}

var players = [];

window.onload = function(){

	//TERRAIN

	var spacing = Math.floor(canvas.width / (Math.random() * 7 + 2 * nop));
	for(var i = 30; i <= canvas.width - 30; i += spacing){
		var spot = new Spot(i, Math.floor(Math.random() * canvas.height / 2 + canvas.height / 3));
		spots.push(spot);
	}

	for(var i = 0; i < spots[0].x; i++)
		ys[i] = spots[0].y;

	for(var j = 0; j < spots.length -1; j++){
		for(var i = spots[j].x; i <= spots[j + 1].x; i++){
			var y = Math.floor( ((spots[j + 1].y - spots[j].y) * Math.sin((Math.PI * (i - spots[j].x)) / (spots[j + 1].x - spots[j].x) - (Math.PI / 2) ) ) / 2 + (spots[j + 1].y + spots[j].y) / 2 );
			ys[i] = y;
		}
	}
	for(var i = spots[spots.length -1].x; i < canvas.width; i++)
		ys[i] = spots[spots.length -1].y;


	//NOT TERRAIN ANYMORE

	//Player
	spacing = Math.floor(spots.length / nop);
	var rlfp = Math.floor(Math.random()*spots.length);
	for(var i = 0; i < nop; i++){
		var p1 = new Tank(spots[(rlfp + spacing * i)%spots.length].x - w/2, spots[(rlfp + spacing * i)%spots.length].y -h, w, h);
		players.push(p1);
	}

}

document.onkeydown = function(evt){
	evt = evt || window.event;
	var code = evt.keyCode || evt.which;
	if(code == 37){
		if((players[cp].y  + players[cp].height) > ys[players[cp].x - 1])
			players[cp].y = ys[players[cp].x - 1] - players[cp].height;
		if((players[cp].y  + players[cp].height) < ys[players[cp].x - 1])
			players[cp].y = ys[players[cp].x - 1] - players[cp].height;
		if(players[cp].x - players[cp].speed > 0)
			players[cp].x -= players[cp].speed;
	}

	if(code == 39){
		if((players[cp].y  + players[cp].height) > ys[players[cp].x + 1])
			players[cp].y = ys[players[cp].x + 1] - players[cp].height;
		if((players[cp].y  + players[cp].height) < ys[players[cp].x + 1])
			players[cp].y = ys[players[cp].x + 1] - players[cp].height;
		if(players[cp].x + players[cp].width + players[cp].speed < canvas.width)
			players[cp].x += players[cp].speed;
	}

	if(code == 32){

	}
}

function loop(){

	c.clearRect(0, 0, canvas.width, canvas.height);
	c.fillStyle = "#27f";

	for(var i = 0; i < canvas.width; i++){
		c.fillRect(i, ys[i], 1, canvas.height);
	}

	for(var i = 0; i < players.length; i++)
		players[i].show();
}

setInterval(loop, 1000/60);
