const player1Score = document.getElementById('player-1-score')
const player2Score = document.getElementById('player-2-score')

let gameStarting = true

player1Score.innerText = (0).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
})
player2Score.innerText = (0).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
})

function angleCalculator(x1, y1, x2, y2) {
    let differenceInX;
    let differenceInY;
    if (x1 > x2 || y1 > y2) {
        differenceInX = x1 - x2
        differenceInY = y1 - y2
    } else {
        differenceInX = x2 - x1
        differenceInY = y2 - y1
    }
    
    let opposite = differenceInY;
    let hypotenuse = differenceInX;
    let angle = Math.tan(degreesToRadians(hypotenuse / opposite))
    return angle
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

class Game {
    static id = 1;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player1_score = 0;
        this.player2_score = 0;
        this.create()
    }

    toString() {
        return `${this.width} ${this.height} ${this.player1_score} ${this.player2_score}`;
    }

    create() {
        // set width and height of game
    }
}

class Ball {
    constructor(direction, speed) {
        this.direction = direction;
        this.speed = speed;
        this.ball = document.getElementById('ball')
        this.create()
    }

    toString() {
        return `${this.width} ${this.height} ${this.player1_score} ${this.player2_score}`;
    }

    create() {
        let ball = this.ball
        ball.hidden = false
        ball.style['left'] = '750px'

        let player1 = document.getElementById('player-1')

        let movingBall = setInterval(() => {
            if (this.direction === 'left') {
                ball.style['left'] = `${Number(getComputedStyle(ball)['left'].slice(0, -2)) - 10}px`

                if (Number(getComputedStyle(ball)['left'].slice(0, -2)) <= 580) {
                    ball.hidden = true
                    clearInterval(movingBall)
                }
                if (ball.getBoundingClientRect().left <= player1.getBoundingClientRect().right && ball.getBoundingClientRect().left >= player1.getBoundingClientRect().left && ball.getBoundingClientRect().bottom >= player1.getBoundingClientRect().top && ball.getBoundingClientRect().top <= player1.getBoundingClientRect().bottom) {
                    this.direction = 'right'
                }
            }
            if (this.direction === 'right') {
                ball.style['left'] = `${Number(getComputedStyle(ball)['left'].slice(0, -2)) + 10}px`

                if (Number(getComputedStyle(ball)['left'].slice(0, -2)) >= 1350) {
                    ball.hidden = true
                    clearInterval(movingBall)
                }
                if (ball.getBoundingClientRect().right <= player2.getBoundingClientRect().left && ball.getBoundingClientRect().right >= player2.getBoundingClientRect().right && ball.getBoundingClientRect().bottom >= player2.getBoundingClientRect().top && ball.getBoundingClientRect().top <= player2.getBoundingClientRect().bottom) {
                    this.direction = 'left'
                }
            }
            console.log(ball.style['left'])
        }, 50)
    }
}

function main() {
    let gameContainer = document.getElementById('game-container')
    let game = new Game(750, 750);

    let ball;

    document.addEventListener('keydown', (event) => {
        let key = event.key
        // console.log(event)

        if (gameStarting) {
            let startPrompt = document.getElementById('start-prompt')
            startPrompt.hidden = true

            let ball = document.getElementById('ball')
            ball.hidden = false

            ball = new Ball('left', 10)

            gameStarting = false
        } else {
            let player1 = document.getElementById('player-1')
            let player2 = document.getElementById('player-2')

            if (key === 'w') {
                console.log('hi')
                if (Number(getComputedStyle(player1)['top'].slice(0, -2)) <= 80) return;
                console.log('hi2')
                player1.style['top'] = `${Number(getComputedStyle(player1)['top'].slice(0, -2)) - 20 }px`
            } else if (key === 's') {
                if (Number(getComputedStyle(player1)['top'].slice(0, -2)) >= 760) return;
                player1.style['top'] = `${Number(getComputedStyle(player1)['top'].slice(0, -2)) + 20 }px`
            } else if (key === 'ArrowUp') {
                if (Number(getComputedStyle(player2)['top'].slice(0, -2)) <= 80) return;
                player2.style['top'] = `${Number(getComputedStyle(player2)['top'].slice(0, -2)) - 20 }px`
            } else if (key === 'ArrowDown') {
                if (Number(getComputedStyle(player2)['top'].slice(0, -2)) >= 760) return;
                player2.style['top'] = `${Number(getComputedStyle(player2)['top'].slice(0, -2)) + 20 }px`
            }
            console.log(`Player 1: ${getComputedStyle(player1)['top']}`)
            console.log(`Player 2: ${getComputedStyle(player2)['top']}`)
        }
    })
    gameContainer.addEventListener('contextmenu', (event) => {
        event.preventDefault()
    });
}

main()