let paddle, ball, bricks;

function setup() {
  createCanvas(400, 400);
  paddle = new Paddle();
  ball = new Ball();
  bricks = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 8; j++) {
      bricks.push(new Brick(j * 50 + 10, i * 20 + 30));
    }
  }
}

function draw() {
  background(0);
  paddle.show();
  paddle.move();
  ball.show();
  ball.move();
  ball.checkCollision(paddle, bricks);

  for (let brick of bricks) {
    brick.show();
  }
}

class Paddle {
  constructor() {
    this.x = width / 2 - 50;
    this.y = height - 20;
    this.w = 100;
    this.h = 10;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    this.x = mouseX - this.w / 2;
    this.x = constrain(this.x, 0, width - this.w);
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 10;
    this.dx = 3;
    this.dy = -3;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < this.r || this.x > width - this.r) this.dx *= -1;
    if (this.y < this.r) this.dy *= -1;
    if (this.y > height) {
      this.x = width / 2;
      this.y = height / 2;
      this.dy = -3;
    }
  }

  checkCollision(paddle, bricks) {
    if (this.y + this.r > paddle.y && this.x > paddle.x && this.x < paddle.x + paddle.w) {
      this.dy *= -1;
    }

    for (let i = bricks.length - 1; i >= 0; i--) {
      let brick = bricks[i];
      if (this.y - this.r < brick.y + brick.h && this.y + this.r > brick.y && this.x > brick.x && this.x < brick.x + brick.w) {
        bricks.splice(i, 1);
        this.dy *= -1;
        break;
      }
    }
  }
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 45;
    this.h = 15;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }
}