const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

class Game {
  constructor() {
    // this.scoreLimit = 10
    this.scoreLimit = 3
    this.gameInProgress = false;
    
    this.paddleHeight = 150;
    this.paddleWidth = 15;
    this.paddleSpeed = 10;

    this.paddle1Data = {
      score: 0,
      x: 10,
      y: canvas.height / 2 - 75,
      width: null,
      height: null,
    };
    this.paddle1Data.width = this.paddleWidth;
    this.paddle1Data.height = this.paddleHeight;

    this.paddle2Data = {
      score: 0,
      x: canvas.width - 20,
      y: canvas.height / 2 - 75,
      width: null,
      height: null,
    };
    this.paddle2Data.width = this.paddleWidth;
    this.paddle2Data.height = this.paddleHeight;

    this.ball = {
        originalX: canvas.width / 2 - 20,
        originalY: canvas.height / 2 - 30,
        originalSpeed: 5,
        originalDirection: -180,
        x: null,
        y: null,
        width: 10,
        height: 10,
        speed: null,
        direction: null,
      };
      this.ball.x = this.ball.originalX;
      this.ball.y = this.ball.originalY;
      this.ball.speed = this.ball.originalSpeed;
      this.ball.direction = this.ball.originalDirection;
  }

  create() {
    let keys = {};
    document.addEventListener('keydown', (event) => {
      let key = event.key;
      keys[key] = true;

      if (!this.gameInProgress) {
        function resetGame(game) {
          game.paddle1Data = {
            score: 0,
            x: 10,
            y: canvas.height / 2 - 75,
            width: null,
            height: null,
          };
          game.paddle1Data.width = game.paddleWidth;
          game.paddle1Data.height = game.paddleHeight;

          game.paddle2Data = {
            score: 0,
            x: canvas.width - 20,
            y: canvas.height / 2 - 75,
            width: null,
            height: null,
          };
          game.paddle2Data.width = game.paddleWidth;
          game.paddle2Data.height = game.paddleHeight;
        }
        resetGame(this);
        this.gameInProgress = true;
      }
    });

    window.addEventListener('keyup', (event) => {
      let key = event.key;
      delete keys[key];
    });

    canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    setInterval(() => {
      //   window.requestAnimationFrame(this.draw);
      this.draw();
      if (this.gameInProgress) {
        if (keys['w']) {
          if (this.paddle1Data.y >= 0) {
            this.paddle1Data.y -= this.paddleSpeed;
          };
        }
        if (keys['s']) {
            if (this.paddle1Data.y <= canvas.height - this.paddleHeight) {
            this.paddle1Data.y += this.paddleSpeed;
          };
        }
        if (keys['ArrowUp']) {
          if (this.paddle2Data.y >= 0) {
            this.paddle2Data.y -= this.paddleSpeed;
          }
        }
        if (keys['ArrowDown']) {
            if (this.paddle2Data.y <= canvas.height - this.paddleHeight) {
            this.paddle2Data.y += this.paddleSpeed;
          };
        }

        if (this.ball.direction < 0) {
          this.ball.x += Math.cos(degreesToRadians(this.ball.direction)) * this.ball.speed;
          this.ball.y += Math.sin(degreesToRadians(this.ball.direction)) * this.ball.speed;
        } else {
          this.ball.x -= Math.cos(degreesToRadians(this.ball.direction)) * this.ball.speed;
          this.ball.y -= Math.sin(degreesToRadians(this.ball.direction)) * this.ball.speed;
        }

        if (this.ball.y <= 0 || this.ball.y >= canvas.height) {
          if (this.ball.direction > 0) {
            this.ball.direction += 90;
          } else {
            this.ball.direction -= 90;
          }
          this.ball.speed += 1;
        }

        if (this.ball.x <= this.paddle1Data.x + this.paddle1Data.width && this.ball.y >= this.paddle1Data.y && this.ball.y <= this.paddle1Data.y + this.paddle1Data.height) {
          this.ball.direction = -this.ball.direction;
          if (Math.floor(Math.random() * 2) + 1 === 1) {
            this.ball.direction += 45;
          } else {
            this.ball.direction -= 45;
          }
          this.ball.speed += 1;
        }

        if (this.ball.x >= this.paddle2Data.x && this.ball.y >= this.paddle2Data.y && this.ball.y <= this.paddle2Data.y + this.paddle2Data.height) {
          this.ball.direction = -this.ball.direction;
          if (Math.floor(Math.random() * 2) + 1 === 1) {
            this.ball.direction += 45;
          } else {
            this.ball.direction -= 45;
          }
          this.ball.speed += 1;
        }

        if (this.ball.x <= 0 || this.ball.x >= canvas.width) {
          function resetBall(ball) {
            ball.x = ball.originalX;
            ball.y = ball.originalY;
            ball.x = ball.originalX;
            ball.y = ball.originalY;
            ball.speed = ball.originalSpeed;
            ball.direction = ball.originalDirection;
          }

          console.log(1, this.ball.x <= 0, this.ball.x >= canvas.width, this.paddle1Data, this.paddle2Data);
          if (this.ball.x <= 0) {
            this.paddle2Data.score += 1;
          } else {
            this.paddle1Data.score += 1;
          }
          console.log(this.ball.x <= 0, this.ball.x >= canvas.width, this.paddle1Data, this.paddle2Data);
          resetBall(this.ball);
        }

        if ([this.paddle1Data.score, this.paddle2Data.score].some((value) => value >= this.scoreLimit)) {
          this.ball.x = -500;
          context.font = '50px Arial';
          context.fillText(`Player ${this.paddle1Data.score >= this.scoreLimit ? 1 : 2} won!`, 125, canvas.height / 2);
          setTimeout(() => {
            console.log(1)
            this.gameInProgress = false;
          });
        }
      }
    }, 1);
  }

  draw() {
    function drawCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawPlayerScores(paddle1Data, paddle2Data) {
      context.fillStyle = '#ffffff';
      context.fillRect(paddle1Data.x, paddle1Data.y, paddle1Data.width, paddle1Data.height);
      context.font = '100px Arial';
      context.fillText(`${formatNumber(paddle1Data.score)}`, 50, 100);

      context.fillStyle = '#ffffff';
      context.fillRect(paddle2Data.x, paddle2Data.y, paddle2Data.width, paddle2Data.height);
      context.font = '100px Arial';
      context.fillText(`${formatNumber(paddle2Data.score)}`, canvas.width - 150, 100);
    }

    function drawDashedLine() {
      context.beginPath();
      context.setLineDash([10, 15]);
      context.moveTo(canvas.width / 2, 10);
      context.lineTo(canvas.width / 2, canvas.height);
      context.lineWidth = 10;
      context.strokeStyle = '#ffffff';
      context.stroke();
    }

    function drawStartingMessage() {
      context.font = '50px Arial';
      context.fillText('Press any key to begin', 125, canvas.height / 2);
    }

    function drawBall(x, y, width, height) {
      context.fillStyle = '#ffffff';
      context.fillRect(x, y, width, height);
    }

    drawCanvas();
    drawPlayerScores(this.paddle1Data, this.paddle2Data);
    drawDashedLine();

    if (!this.gameInProgress) {
      drawStartingMessage();
      return;
    }
    drawBall(this.ball.x, this.ball.y, this.ball.width, this.ball.height);
  }
}

function normaliseAngle(angle) {
  let newAngle = angle % 360;
  if (newAngle < 0) {
    newAngle += 360;
  }
  return newAngle;
}

function angleCalculator(x1, y1, x2, y2) {
  let differenceInX = getDifference(x1, x2);
  let differenceInY = getDifference(y1, y2);

  let opposite = differenceInY;
  let adjacent = differenceInX;

  let radianAngle = Math.atan(degreesToRadians(opposite / adjacent));
  let degreesAngle = radiansToDegrees(radianAngle);

  return degreesAngle;
}

function formatNumber(number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

function getDifference(a, b) {
  return a > b ? a - b : b - a;
}

let game = new Game();
game.create();
