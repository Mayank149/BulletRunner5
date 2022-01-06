var player, pimg;
var stone;
var w1, w2, w3;
var bullet,bullets,hp;
var backimg;
var stoneG, spikesG,bulletsG,bulletG,hpG;
var score = 0;
var stoneimg, spikesimg, bulletimg,hpimg;
var textBox, textBox1;
var bulletsLeft = 5;
var health = 50;
var explosion, laser;
var gameState = 0;

function preload() {

    backimg = loadImage("Images/background.png");
    pimg = loadImage("Images/player.png");
    stoneimg = loadImage("Images/rock.png");
    spikesimg = loadImage("Images/spikes.png");
    bulletimg = loadImage("Images/bulletbunch.png");
    hpimg = loadImage("Images/heart.png");
    explosion = loadSound("explosion.wav");
    laser = loadSound("laser.mp3");
    


}


function setup() {
    createCanvas(displayWidth - 50, displayHeight - 150);

    wall1 = createSprite(displayWidth / 2 - 200, displayHeight / 2 - 270, 1000, 10);
    wall2 = createSprite(displayWidth / 2 - 200, displayHeight - 180, 1000, 10);
    w3 = createSprite(520, displayHeight / 2, 30, 1000);
    wall1.visible = false;
    wall2.visible = false;
    w3.visible = false;

    player = createSprite(displayWidth / 2, displayHeight / 2, 40, 50);
    player.addImage(pimg);
    player.scale = 0.25;

    //player.debug = true;
    player.setCollider("rectangle", 0, 0, 100, 500);
    stone = createSprite(-70, -70, 70, 70);
    stone.addImage(stoneimg);
    stone.scale = 0.2;
    
    spikes = createSprite(-70, -70, 70, 70);
    spikes.addImage(spikesimg);
    spikes.scale = 0.2;

    textBox = createSprite(displayWidth / 2 + 200, displayHeight / 4 , 600, 50);
    textBox.visible = false;
    textBox.shapeColor = "blue";
    
    textBox1 = createSprite(displayWidth-130, displayHeight - 650,600,50)
    textBox1.shapeColor = "blue";
    textBox1.visible = false;


    //stone.debug = true;

    stone.setCollider("rectangle", 0, 0, 400, 150);

    bullet = createSprite(0, 0, 1, 1);
    bullets = createSprite(0, 0, 1, 1);
    hp = createSprite(0, 0, 1, 1);

    textSize(25);
    fill("red")

    stoneG = new Group();
    spikesG = new Group();
    bulletsG = new Group();
    bulletG = new Group();
    hpG = new Group();


}

function draw() {
    background(backimg);
    drawSprites();

    player.collide(wall1);
    player.collide(wall2);

    camera.position.x = player.x + 500;
    camera.position.y = displayHeight / 2;

    if (gameState === 0) {
        textSize(25);
        fill("red")
        text("Press Enter To Begin, Up And Down Arrow To Control", (displayWidth / 2) - 100, displayHeight / 4);
        textBox.visible = true;
        
    }




    if (gameState === 1) {

        text("Score:- " + score, displayWidth, displayHeight - 650);
        text("Bullets Left:- " + bulletsLeft, displayWidth-200, displayHeight - 650);
        text("Health:- " + health, displayWidth-400, displayHeight - 650);
        textBox1.visible = true;
        
       
        textBox.visible = false;
        textSize(10);

        if (frameCount % 40 === 0) {
            stone = createSprite(player.x + 700, random(180, 500), 70, 70);
            stone.addImage(stoneimg);
            stoneG.add(stone);



            stone.scale = random(0.15, 0.35);

            //stone.debug = true;
            
            

        }

        if (frameCount%70 ==0) {
            spikes = createSprite(player.x + 700, random(180, 500), 70, 70);
            spikes.addImage(spikesimg);
            spikesG.add(spikes);

            spikes.scale = random(0.15, 0.35);
            
        }
        if (frameCount%100 ==0) {
            bullets = createSprite(player.x + 700, random(180, 500), 70, 70);
            bullets.addImage(bulletimg);
            bulletsG.add(bullets);

            bullets.scale = 0.2;
          
        }
        if (frameCount%460 ==0) {
            hp = createSprite(player.x + 700, random(180, 500), 70, 70);
            hp.addImage(hpimg);
            hpG.add(hp);

            hp.scale = 0.15;
          
        }

        

        if (keyWentDown("space") && bulletsLeft >= 1) {
            var temp_bullet = createBullet();
            laser.play();
            
            bulletsLeft--;
            bulletG.add(bullet);

            bullet.shapeColor = "green";


        }
        stone.velocityX = -20;
        spikes.velocityX = -20;
        bullets.velocityX = -20;
        hp.velocityX = -20;


    }

    if (bullet.isTouching(stoneG)) {

        stoneG.destroyEach();
        bulletG.destroyEach();
        score += 10;

    }
    if (bullet.isTouching(spikesG)) {

        spikesG.destroyEach();
        bulletG.destroyEach();
        score += 20;

    }

    if (w3.isTouching(stoneG)) {
        stoneG.destroyEach();

    }
    if(player.isTouching(bullets)){

        bulletsG.destroyEach();
        bulletsLeft = bulletsLeft+3;
        

    }
    if(player.isTouching(hp)){

        hpG.destroyEach();
        health = health+round(random(6,10));
        

    }
    if (player.isTouching(stone) || player.isTouching(spikes)) {
        stoneG.destroyEach();
        spikesG.destroyEach();  
        explosion.play()
        
        health = health-round(random(5,10));


    }
    if(health <= 0){
        gameState = 2;
    }
    if (gameState === 2) {
        textSize(25);
        fill("red")
        text("GAME OVER, PRESS R TO RESTART \n Your Score-"+score, player.x+20, player.y);
        textBox1.visible = false;
        textBox.visible = false;
        bulletsLeft = 5;



    }

    if (keyIsDown(UP_ARROW) && gameState === 1) {

        player.y = player.y - 20


    }

    if (keyIsDown(DOWN_ARROW) && gameState === 1) {

        player.y = player.y + 20


    }



    if (keyWentDown(82) && gameState === 2) {

        health = 50;
        gameState = 0;
        player.x = displayWidth / 2;
        player.y = displayHeight / 2;
        
        score = 0;






    }
    if (keyWentDown("enter") && gameState === 0) {

        gameState = 1;


    }

   

}

// Creating  bullet for spaceship
function createBullet() {
    bullet = createSprite(player.x, player.y, 60, 10);
    bullet.velocityX = 60;

    return bullet;
}