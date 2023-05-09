let ground;
let lander;
var lander_img;
var bg_img;
var bullet_img,bullet;
var alien_img,alien;
var aliensGroup,bulletsGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var boom_img,gameOver_img,restart_img;
var restart,boom,gameOver; 



var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  bullet_img = loadImage("bullet.png");
  alien_img = loadImage("alien.png");
  gameOver_img = loadImage("gameOver.png");
  boom_img = loadAnimation("boom.png");
  restart_img = loadImage("restart.png");

}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  lander = createSprite(150,300,30,30);
  lander.addImage(lander_img);
  lander.addAnimation("blast",boom_img);
  lander.scale = 0.1;


  bullet = createSprite(150,270,30,30);
  bullet.addImage(bullet_img);
  bullet.scale = 0.015;

  gameOver = createSprite(300,200);
  gameOver.addImage(gameOver_img);
  gameOver.scale=0.5;

  restart = createSprite(300,400);
  restart.addImage(restart_img);
  restart.scale=0.1;

 

  lander.depth = bullet.depth+1;


  aliensGroup = createGroup();
  //bulletsGroup = createGroup();


  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  pop();

  //fall down
 // vy +=g;
  //lander.position.y+=vy;
  bullet.position.x=lander.position.x;
 // bullet.position.y=lander.position.y;
  if(gameState===PLAY){
    gameOver.visible=false;
    restart.visible=false;
    

  
 

  if(keyIsDown(UP_ARROW)){
    lander.position.y-=5;
   }

   if(keyIsDown(DOWN_ARROW)){
    lander.position.y+=5;
   }

   if(keyIsDown(LEFT_ARROW)){
    lander.position.x-=5;
   }

   if(keyIsDown(RIGHT_ARROW)){
    lander.position.x+=5;

   }
   spawnAliens();

   if(keyDown("space")){
    bullet.position.y-=8;
   }
   if(aliensGroup.isTouching(lander)){
    gameState=END;
   }
  }
  else if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    lander.changeAnimation("blast",boom_img);
    aliensGroup.setVelocityYEach(0);
  }

   //if(bullet.isTouching (alien)){
   // alien.destroy();
   //}

   





  drawSprites();
}

function spawnAliens(){
  if(frameCount % 60 === 0){
    alien = createSprite(150,100,50,70);
  alien.x=Math.round(random(150,600));
  alien.addImage(alien_img);
  alien.scale = 0.3;
  alien.velocityY=2;

  alien.lifetime=180;
  aliensGroup.add(alien);


  }
}





