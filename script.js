var score = 0, gscore = 0,ghost=false;
var player = {
  x:50,
  y:100,
  pacmouth:320,
  pacdir:0,
  psize:32,
  speed:5
};

var enemy = {
  x:150,
  y:200,
  speed:5,
  moving: 0,
  dirx: 0,
  diry: 0,
  flash:0,
  ghosteat: false
}
var powerdot = {
  x:10,
  y:10,
  powerup: false,
  pcountdown:0,
  ghostNum:0
  
}


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
    if(player.x < 0){player.x=(canvas.width-32);}
    if(player.y < 0){player.y=(canvas.height-32);}
    if(player.pacmouth == 320) {
      player.pacmouth = 352;
    } else {
      player.pacmouth = 320;
    }
    render();
}

function checkReady() {
    
    this.ready = true;
    playgame();
}

function playgame() {
    render();
    requestAnimationFrame(playgame);
}

function myNum(n) {
  return Math.floor(Math.random()*n);
}

function render() {
  
  context.fillStyle = "black";
  context.fillRect(0,0,canvas.width,canvas.height);

  if(!powerdot.powerup && powerdot.pcountdown < 5){
      powerdot.x = myNum(420)+30;
      powerdot.y = myNum(250);
      powerdot.powerup = true;

  }

  if(!ghost){
    enemy.ghostNum = myNum(5)*64;
    enemy.x = myNum(450);
    enemy.y = myNum(250)+30;
    ghost = true;
  }
  if(enemy.moving <0){
    enemy.moving = (myNum(20)*3)+myNum(1);
    enemy.speed = myNum(3)+1;
    enemy.dirx = 0;
    enemy.diry = 0;
    if(powerdot.ghosteat) {enemy.speed = enemy.speed*-1;}
    if(enemy.moving % 2){
      if(player.x < enemy.x){enemy.dirx = -enemy.speed;}else{enemy.dirx = enemy.speed;}
    }else{
      if(player.y < enemy.y){enemy.diry = -enemy.speed;}else{enemy.diry = enemy.speed;}
    }
  }
  enemy.moving--;
  //enemy.x = enemy.x + enemy.dirx;
  //enemy.y = enemy.y + enemy.diry;

    if(enemy.x >= (canvas.width-32)) {enemy.x=0;}
    if(enemy.y >= (canvas.height-32)) {enemy.y=0;}
    if(enemy.x < 0){enemy.x=(canvas.width-32);}
    if(enemy.y < 0){enemy.y=(canvas.height-32);}

     //Collision Detection ghost
    if(player.x <= (enemy.x+26) &&
      enemy.x <= (player.x+26) && 
      player.y <= (enemy.y+26) &&  
      enemy.y <= (player.y +32)) {
        console.log('ghost');
        if(powerdot.ghosteat) {
          score++;
        } else {
          gscore++;
        }
    }


    //Collision Detection powerup
    if(player.x <= (powerdot.x-10) &&
      powerdot.x <= (player.x+32) && 
      player.y <= (powerdot.y-10) &&  
      powerdot.y <= (player.y +32)) {
        console.log('hit');
        powerdot.powerup = false;
        powerdot.pcountdown = 500;
        powerdot.ghostNum = enemy.ghostNum;
        enemy.ghostNum = 384;
        powerdot.x = 0;
        powerdot.y = 0;
        powerdot.ghosteat = true;
    }
  
  if(powerdot.ghosteat) {
    powerdot.pcountdown--;
  }
  if(powerdot.pcountdown<=0) {
    powerdot.ghosteat = false;
    powerdot.pcountdown--;
    enemy.ghostNum = powerdot.ghostNum;
  }

  if(powerdot.powerup){
      context.fillStyle = "#ffffff";
      context.beginPath();
      context.arc(powerdot.x, powerdot.y, 10,0, Math.PI * 2, true);
      context.closePath();
      context.fill();
  }

  if(enemy.flash == 0) {
      enemy.flash = 32;
  } else {
      enemy.flash = 0;
  }

  //enemy draw
  context.drawImage(mainImage,enemy.ghostNum,enemy.flash,32,32,enemy.x,enemy.y,32,32);
  //pacman draw
  context.drawImage(mainImage,player.pacmouth,player.pacdir,32,32,player.x,player.y,32,32);

  context.font = "20px Verdana";
  context.fillStyle = "white";
  context.fillText("Pacman: "+score+" vs Ghost: "+gscore,2,18);

}

