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
  image(catImg, width/8, height - catImg.height - 240);
}

function displayClouds() {
  // clouds 배열 내 모든 구름을 그리는 로직
}

function handleObstacles() {
  // obstacles 배열 내 모든 장애물을 처리하는 로직
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
