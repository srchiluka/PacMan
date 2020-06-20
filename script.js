var score = 0;
var gscore = 0;
var player = {
  x:50,
  y:100,
  pacmouth:320,
  pacdir:0,
  psize:32,
  speed:5
};


var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;

//canvas.ready = false;
//canvas.onload = checkReady;
mainImage = new Image();
mainImage.ready = false
mainImage.onload = checkReady;
mainImage.src = "pac.png";

var keyclick = {};
document.addEventListener('keydown',function (event) {
  //console.log('inside keydown');
  keyclick[event.keyCode]=true;
  //console.log('calling move');
  move(keyclick);
},false);

document.addEventListener('keyup',function (event) {
  //console.log('inside keyup');
  delete keyclick[event.keyCode];
},false);

function move(keyclick) {
    if(37 in keyclick){player.x -= player.speed;player.pacdir=64;}
    if(38 in keyclick){player.y -= player.speed;player.pacdir=96;}
    if(39 in keyclick){player.x += player.speed;player.pacdir=0;}
    if(40 in keyclick){player.y += player.speed;player.pacdir=32;}
    
    if(player.x >= (canvas.width-32)) {player.x=0;}
    if(player.y >= (canvas.height-32)) {player.y=0;}
    if(player.x < 0) {player.x=(canvas.width-32);}
    if(player.y < 0) {player.y=(canvas.height-32);}

    render();
}

function checkReady() {
    
    this.ready = true;
    playgame();
}

function playgame() {
    render();
}

function render() {
  
  context.fillStyle = "blue";
  context.fillRect(0,0,canvas.width,canvas.height);
  context.drawImage(mainImage,player.pacmouth,player.pacdir,32,32,player.x,player.y,32,32);
  context.font = "20px Verdana";
  context.fillStyle = "white";
  context.fillText("Pacman: "+score+" vs Ghost: "+gscore,2,18);
}

