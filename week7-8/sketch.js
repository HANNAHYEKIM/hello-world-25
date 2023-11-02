let buttonImg, button2Img, catImg, canImg, cactus1Img, cactus2Img, cactus3Img;
let cloudImgs = [];
let score = 0;
let isButtonClicked = false;
let isJumping = false;
let obstacles = [];
let clouds = [];

function preload() {
  buttonImg = loadImage('button1.png');
  button2Img = loadImage('button2.png');
  catImg = loadImage('cat.png');
  canImg = loadImage('can.png');
  cactus1Img = loadImage('cactus1.png');
  cactus2Img = loadImage('cactus2.png');
  cactus3Img = loadImage('cactus3.png');
  for (let i = 1; i <= 4; i++) {
    cloudImgs.push(loadImage(`cloud${i}.png`));
  }
}

function setup() {
  createCanvas(1920, 1080);
  textAlign(CENTER, CENTER);
  textSize(40);
  fill('#FFFFFF');
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
    moveCat();
    displayClouds();
    handleObstacles();
  }
}

function moveCat() {
  image(catImg, width/8, height - catImg.height - 244);
}

function displayClouds() {
  // clouds 배열 내 모든 구름을 그리는 로직
}

function handleObstacles() {
  class Obstacle {
    constructor(img, type) {
      this.img = img;
      this.type = type; // 'can', 'cactus1', 'cactus2', 'cactus3'
      this.x = width;
      this.y = height - 240 - this.img.height;
      this.speed = 5;
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
        if (this.type === 'can') {
          score += 10;
          return false; // 캔은 점수를 얻고, 삭제되지 않음.
        } else {
          return true; // 선인장에 부딪힌 경우
        }
      }
      return false;
    }
  }

  function handleObstacles() {
    // 일정 확률로 장애물 추가
    if (random(0, 1) < 0.02) { // 2% 확률로 장애물 생성
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
  
    // 장애물 움직이기 & 화면에 그리기
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].move();
      obstacles[i].display();
  
      const catX = width/8;
      const catY = height - 286 - catImg.height - 240;
      if (obstacles[i].checkCollision(catX, catY, catImg.width, catImg.height)) {
        if (obstacles[i].type !== 'can') {
          // 게임 오버 로직
          noLoop();
          fill(255, 0, 0);
          textSize(72);
          text('GAME OVER', width / 2, height / 2);
          return;
        }
        // 캔인 경우 점수가 올라가고, 장애물 배열에서 삭제
        obstacles.splice(i, 1);
      } else if (obstacles[i].x + obstacles[i].img.width < 0) {
        // 화면 밖으로 나가면 장애물 배열에서 삭제
        obstacles.splice(i, 1);
      }
    }
  }
  
  
}

function mouseClicked() {
  if (!isButtonClicked) {
    isButtonClicked = true;
    // 기타 필요한 초기화 로직
  } else {
    isJumping = true;
    setTimeout(() => {
      isJumping = false;
    }, 500);
  }
}
