let fishes = [];
let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 初始魚
  for (let i = 0; i < 8; i++) {
    fishes.push(new Fish());
  }
}

function draw() {

  background("#ffcdb2");

  // 氣泡
  if (random(1) < 0.1) {
    bubbles.push(new Bubble());
  }

  for (let b of bubbles) {
    b.move();
    b.display();
  }

  // 移除消失氣泡
  bubbles = bubbles.filter(b => !b.finished());

  // 魚
  for (let f of fishes) {
    f.move();
    f.display();
  }
}

class Fish {

  constructor() {
    this.x = random(width);
    this.y = random(height);

    this.dx = random(-2,2);
    this.dy = random(-1,1);

    this.size = random(30,80);

    this.color = color(random(255),random(255),random(255));
  }

  move() {

    // 滑鼠靠近會逃跑
    let d = dist(mouseX,mouseY,this.x,this.y);

    if (d < 120) {
      this.dx += random(-0.5,0.5);
      this.dy += random(-0.5,0.5);
    }

    this.x += this.dx;
    this.y += this.dy;

    // 邊界反彈
    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
  }

  display() {

    push();

    translate(this.x,this.y);

    fill(this.color);
    noStroke();

    // 魚身
    ellipse(0,0,this.size,this.size*0.6);

    // 尾巴
    triangle(
      -this.size/2,0,
      -this.size, this.size*0.3,
      -this.size,-this.size*0.3
    );

    pop();
  }
}

class Bubble {

  constructor() {
    this.x = random(width);
    this.y = height;
    this.size = random(5,15);
    this.speed = random(1,3);
  }

  move() {
    this.y -= this.speed;
  }

  display() {
    noFill();
    stroke(255);
    circle(this.x,this.y,this.size);
  }

  finished() {
    return this.y < 0;
  }

}

// 點擊生成魚
function mousePressed(){
  fishes.push(new Fish());
}