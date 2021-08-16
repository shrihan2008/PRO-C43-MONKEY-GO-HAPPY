var backImage,backgr,obstacles;
var player, player_running;
var ground,ground_img;
var score=0
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana1=loadImage("banana.png")
  obstacleImg=loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup=new Group()
  ObstaclesGroup=new Group()
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  spawnFood()
  spawnObstacles()
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);


  if(FoodGroup.isTouching(player)){  
   
    FoodGroup.destroyEach()
    score = score+2
    player.scale+= +0.1
  
  }
  if(score===6){

  }
 if(ObstaclesGroup.isTouching(player)){
  gameState=END
}
  }
 else if(gameState===END){
 backgr.remove()

  player.visible=false
  ObstaclesGroup.destroyEach()
  FoodGroup.destroyEach()
  text("GAME OVER",200,200)
 
  text("Score:"+score,400,100)
  }
  
  
  drawSprites();
}

function spawnFood(){
  if(frameCount%80 ===0){
    var banana=createSprite(600,250,40,10)
    banana.y=random(120,200)
    banana.addImage(banana1)
    banana.scale=0.05
    banana.velocityX=-4

    banana.lifetime=300
    player.depth=banana.depth+1
    FoodGroup.add(banana)
  }
}

function spawnObstacles(){
  if(frameCount%190 ===0){
    var obstacles=createSprite(100,350,40,10)
    obstacles.x=random(120,200)
    obstacles.addImage(obstacleImg)
    obstacles.scale=0.1
    obstacles.velocityX=-6

    obstacles.lifetime=300
   
    ObstaclesGroup.add(obstacles)
  }
}