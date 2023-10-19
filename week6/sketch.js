let creature;
let poops = [];
let buttons = [];

function setup() {
  createCanvas(1920, 1080);
  creature = new Creature(width / 2, height / 2, 16, 16);
  
  let btnX = 380;
  let btnY = height - 160;
  let btnWidth = 248;
  let btnHeight = 80;
  let btnGap = 56;
  
  buttons.push(new Button(btnX, btnY, btnWidth, btnHeight, 'Feed', () => creature.feed()));
  btnX += btnWidth + btnGap;
  buttons.push(new Button(btnX, btnY, btnWidth, btnHeight, 'Love', () => creature.love()));
  btnX += btnWidth + btnGap;
  buttons.push(new Button(btnX, btnY, btnWidth, btnHeight, 'Poop', () => poops = []));
  btnX += btnWidth + btnGap;
  buttons.push(new Button(btnX, btnY, btnWidth, btnHeight, 'Reset', () => creature.reset()));

  noStroke();
}

function draw() {
  background(0);
  creature.update();
  creature.display();

  for (let poop of poops) {
    poop.display();
  }

  for (let button of buttons) {
    button.display();
  }
}

function mousePressed() {
  for (let button of buttons) {
    if (button.contains(mouseX, mouseY)) {
      button.click();
    }
  }
}

class Creature {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color('#FFFFFF');
    this.feedCount = 0;
  }

  update() {
    // 이동 로직 및 화면 경계 체크
    this.x += random(-2, 2);
    this.y += random(-2, 2);

    this.x = constrain(this.x, this.w / 2, width - this.w / 2);
    this.y = constrain(this.y, this.h / 2, height - this.h / 2);
  }

  feed() {
    this.w += 4;
    this.h += 4;
    this.feedCount++;

    if (this.feedCount >= 5) {
      this.feedCount = 0;
      let poopSize = random(20, 200);
      poops.push(new Poop(random(width), random(height), poopSize, poopSize));
    }
  }

  love() {
    this.color = color('#EF98B6');
    setTimeout(() => {
      this.color = color('#FFFFFF');
    }, 5000);
  }

  reset() {
    this.w = 16;
    this.h = 16;
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.w, this.h);
  }
}

class Poop {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    fill('#95653A');
    ellipse(this.x, this.y, this.w, this.h);
  }
}

class Button {
  constructor(x, y, w, h, label, callback) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.callback = callback;
  }

  contains(px, py) {
    return px >= this.x && px <= this.x + this.w && py >= this.y && py <= this.y + this.h;
  }

  click() {
    this.callback();
  }

  display() {
    fill('#F2F2F2');
    rect(this.x, this.y, this.w, this.h, 100);
    fill(0);
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + (this.w / 2), this.y + (this.h / 2));
  }
}
