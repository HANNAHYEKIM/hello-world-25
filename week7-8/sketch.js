let buttonImg, button2Img, catImg, canImg, cactus1Img, cactus2Img, cactus3Img;
let cloudImgs = [];
let score = 0;
let isButtonClicked = false;
let isJumping = false;
let obstacles = [];
let clouds = [];
let catYPos; 
let catYVelocity = 0; 
let jumpForce = -10;  
let gravity = 1.0;  

function preload() {
  buttonImg = loadImage('button1.png');
  button2Img = loadImage('button2.png');
  catImg = loadImage('cat.png');
  canImg = loadImage('can.png');
  cactus1Img = loadImage('cactus1.png');
  cactus2Img = loadImage('cactus2.png');
  cactus3Img = loadImage('cactus3.png');
  cloudImg = loadImage('cloud.png');
  }


function setup() {
  createCanvas(1920, 1080);
  textAlign(CENTER, CENTER);
  textSize(40);
  fill('#FFFFFF');
  
  catYPos = height - catImg.height - 244; 
}

function draw() {
  if (!isButtonClicked) {
    background('#303437');
    image(buttonImg, width/2 - buttonImg.width/2, height - buttonImg.height - 64);
    text('Click to start!', width/2, height - buttonImg.height - 64 - 48);
  } else {
    background('#FFFFFF');
    fill('#E7E7E7');
    rect(0, height - 286, width, 286);
    image(button2Img, width/2 - buttonImg.width/2, height - buttonImg.height - 64);
    displayClouds();
    handleObstacles();
    moveCat();  
    displayScore();  
  }
}

function displayScore() {
  fill('#000000');
  textSize(40);
  text('Score: ' + score, 120, 50);
}

function moveCat() {
  if (isJumping && catYPos === height - catImg.height - 244) {
    catYVelocity = -sqrt(2 * 9.81 * 50); 
  }
  catYVelocity += gravity;
  catYPos += catYVelocity;

  if (catYPos > height - catImg.height - 244) {
    catYPos = height - catImg.height - 244;
    catYVelocity = 0;
  }

  image(catImg, width/8, catYPos);
}

function displayClouds() {
  for (let cloud of clouds) {
    image(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);  
    cloud.x -= cloud.speed;
    
    if (cloud.x < -cloud.width) {
      let index = clouds.indexOf(cloud);
      clouds.splice(index, 1);
    }
  }

  if (random(0, 1) < 0.005) {
    let cloudWidth = random(120, 256);
    let cloudHeight = (cloudWidth / cloudImg.width) * cloudImg.height;
    clouds.push({
      img: cloudImg,
      x: width,
      y: random(50, height - 640),
      width: cloudWidth,
      height: cloudHeight,
      speed: random(1, 3)
    });
  }
}

class Obstacle {
  constructor(img, type) {
    this.img = img;
    this.type = type;
    this.x = width;
    this.y = height - 240 - this.img.height;
    this.speed = 8;
  }

  move() {
    this.x -= this.speed;
  }

  display() {
    image(this.img, this.x, this.y);
  }

checkCollision(catX, catY, catWidth, catHeight) {
    if (catX + catWidth > this.x && catX < this.x + this.img.width && 
        catY + catHeight > this.y && catY < this.y + this.img.height) {
      return true;  
    }
    return false;
}

}

function handleObstacles() {
  let spacing = random(1000, 1500); 

  if (obstacles.length === 0 || (obstacles[obstacles.length - 1].x < width - spacing)) {
    let choice = floor(random(1, 5));
    let chosenImg;
    switch (choice) {
      case 1: chosenImg = canImg; break;
      case 2: chosenImg = cactus1Img; break;
      case 3: chosenImg = cactus2Img; break;
      case 4: chosenImg = cactus3Img; break;
    }
    obstacles.push(new Obstacle(chosenImg, choice === 1 ? 'can' : `cactus${choice - 1}`));
  }

  const catX = width/8;
  const catY = catYPos;
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move();
    obstacles[i].display();

    if (obstacles[i].checkCollision(catX, catY, catImg.width, catImg.height)) {
      if (obstacles[i].type === 'can') {
        score += 50;  
        obstacles.splice(i, 1); 
      } else if (obstacles[i].type.startsWith('cactus')) { 
        noLoop();
        fill(255, 0, 0);
        textSize(72);
        text('GAME OVER', width / 2, height / 2);
        return;
      }
    } else if (obstacles[i].x + obstacles[i].img.width < 0) {
      if (obstacles[i].type.startsWith('cactus')) {
        score += 10;  
      }
      obstacles.splice(i, 1);
    }
  }
}


function mouseClicked() {
  if (!isButtonClicked) {
    isButtonClicked = true;
  } else {
    isJumping = true;
    setTimeout(() => {
      isJumping = false;
    }, 500);
  }
}

