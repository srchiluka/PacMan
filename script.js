var score = 0, 
  gscore = 0,
  ghostFlag = false,
  ghost2Flag = false,
  countBlink = 10,
player = {
  x : 50,
  y : 100,
  pacMouth : 320,
  pacDirection : 0,
  pSize : 32,
  speed : 7
};

var enemy = {
  x : 150,
  y : 200,
  speed : 5,
  moving : 0,
  dirx : 0,
  diry : 0,
  flash : 0,
  ghostEatFlag : false  //Once eat, this goes as true
};

var enemy2 = {
  x : 150,
  y : 200,
  speed : 5,
  moving : 0,
  dirx :  0,
  diry :  0,
  flash : 0,
  ghostEatFlag :  false
};

var powerDot = {
  x : 10,
  y : 10,
  powerup :  false,
  powerTimer : 0,   //Once eat, this timer sets and goes down
  ghostNum : 0,
  ghostNum2 : 0
  
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

//Arrow key event, move the pacman
function move(keyclick) {
    if(37 in keyclick) {
      player.x -= player.speed;
      player.pacDirection=64;
    }
    if(38 in keyclick) { 
      player.y -= player.speed;
      player.pacDirection=96;
    }
    if(39 in keyclick) {
      player.x += player.speed;
      player.pacDirection=0;
    }
    if(40 in keyclick) {
      player.y += player.speed;
      player.pacDirection=32;
    }
    
    if(player.x >= (canvas.width-32)) {player.x=0;}
    if(player.y >= (canvas.height-32)) {player.y=0;}
    if(player.x < 0){player.x=(canvas.width-32);}
    if(player.y < 0){player.y=(canvas.height-32);}
    if(player.pacMouth == 320) {
      player.pacMouth = 352;
    } else {
      player.pacMouth = 320;
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

  if(!powerDot.powerup && powerDot.powerTimer < 5){
      powerDot.x = myNum(420)+30;
      powerDot.y = myNum(250);
      powerDot.powerup = true;

  }

  if(!ghostFlag){
    enemy.ghostNum = myNum(5)*64;
    enemy.x = myNum(450)+30;
    enemy.y = myNum(250)+30;
    ghostFlag = true;
  }

   if(!ghost2Flag){
    enemy2.ghostNum = myNum(5)*64;
    enemy2.x = myNum(450)+30;
    enemy2.y = myNum(250)+30;
    ghost2Flag = true;
  }

  if(enemy.moving <0){
    enemy.moving = (myNum(20)*3)+myNum(1);
    enemy.speed = myNum(2)+1;
    enemy.dirx = 0;
    enemy.diry = 0;
    if(powerDot.ghostEatFlag) {enemy.speed = enemy.speed*-1;}
    if(enemy.moving % 2){
      if(player.x < enemy.x){enemy.dirx = -enemy.speed;}else{enemy.dirx = enemy.speed;}
    }else{
      if(player.y < enemy.y){enemy.diry = -enemy.speed;}else{enemy.diry = enemy.speed;}
    }
  }
      if(enemy2.moving <0){
    enemy2.moving = (myNum(20)*3)+myNum(1);
    enemy2.speed = myNum(2)+1;
    enemy2.dirx = 0;
    enemy2.diry = 0;
    if(powerDot.ghostEatFlag) {enemy2.speed = enemy2.speed*-1;}
    if(enemy2.moving % 2){
      if(player.x < enemy2.x){enemy2.dirx = -enemy2.speed;}else{enemy2.dirx = enemy2.speed;}
    }else{
      if(player.y < enemy2.y){enemy2.diry = -enemy2.speed;}else{enemy2.diry = enemy2.speed;}
    }


  }
    enemy.moving--;
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry;

    if(enemy.x >= (canvas.width-32)) {enemy.x=0;}
    if(enemy.y >= (canvas.height-32)) {enemy.y=0;}
    if(enemy.x < 0){enemy.x=(canvas.width-32);}
    if(enemy.y < 0){enemy.y=(canvas.height-32);}

    enemy2.moving--;
    enemy2.x = enemy2.x + enemy2.dirx;
    enemy2.y = enemy2.y + enemy2.diry;

    if(enemy2.x >= (canvas.width-32)) {enemy2.x=0;}
    if(enemy2.y >= (canvas.height-32)) {enemy2.y=0;}
    if(enemy2.x < 0){enemy2.x=(canvas.width-32);}
    if(enemy2.y < 0){enemy2.y=(canvas.height-32);}

     //Collision Detection ghost
    if(player.x <= (enemy.x+26) &&
      enemy.x <= (player.x+26) && 
      player.y <= (enemy.y+26) &&  
      enemy.y <= (player.y +32)) {
        console.log('ghost');
        if(powerDot.ghostEatFlag) {
          score++;
        } else {
          gscore++;
        }
        player.x = 10;
        player.y = 100;
        enemy.x = 300; 
        enemy.y = 200;
        powerDot.powerTimer = 0;
    }

        //collision detecction ghost2Flag
        if(player.x <= (enemy2.x+26) &&
      enemy2.x <= (player.x+26) && 
      player.y <= (enemy2.y+26) &&  
      enemy2.y <= (player.y +32)) {
        console.log('ghost');
        if(powerDot.ghostEatFlag) {
          score++;
        } else {
          gscore++;
        }
        player.x = 10;
        player.y = 100;
        enemy2.x = 300; 
        enemy2.y = 200;
        powerDot.powerTimer = 0;
    }


    //Collision Detection powerup
    if(player.x <= (powerDot.x-10) &&
      powerDot.x <= (player.x+32) && 
      player.y <= (powerDot.y-10) &&  
      powerDot.y <= (player.y +32)) {
        console.log('hit');
        powerDot.powerup = false;
        powerDot.powerTimer = 500;
        powerDot.ghostNum = enemy.ghostNum;
        powerDot.ghostNum2 = enemy2.ghostNum;
        enemy.ghostNum = 384;
        enemy2.ghostNum = 384;
        powerDot.x = 0;
        powerDot.y = 0;
        powerDot.ghostEatFlag = true;
        player.speed = 10;
    }
  
  //powerup countdown
  if(powerDot.ghostEatFlag) {
    powerDot.powerTimer--;
  }
  if(powerDot.powerTimer<=0) {
    powerDot.ghostEatFlag = false;
    powerDot.powerTimer--;
    enemy.ghostNum = powerDot.ghostNum;
    enemy2.ghostNum = powerDot.ghostNum;
    player.speed = 7;
  }

  if(powerDot.powerup){
      context.fillStyle = "#ffffff";
      context.beginPath();
      context.arc(powerDot.x, powerDot.y, 10,0, Math.PI * 2, true);
      context.closePath();
      context.fill();
  }
  //enemy blinking
  if(countBlink>0){
    countBlink--;
  } else{
      countBlink = 20;
      if(enemy.flash == 0) {
        enemy.flash = 32; enemy2.flash = 32;
      } else {
        enemy.flash = 0;            enemy2.flash = 0;
      }
    }

  //enemy draw
  context.drawImage(mainImage,enemy2.ghostNum,enemy2.flash,32,32,enemy2.x,enemy2.y,32,32);
  context.drawImage(mainImage,enemy.ghostNum,enemy.flash,32,32,enemy.x,enemy.y,32,32);
  //pacman draw
  context.drawImage(mainImage,player.pacMouth,player.pacDirection,32,32,player.x,player.y,32,32);

  context.font = "20px Verdana";
  context.fillStyle = "white";
  context.fillText("Pacman :  "+score+" vs Ghost :  "+gscore,2,18);

  }

