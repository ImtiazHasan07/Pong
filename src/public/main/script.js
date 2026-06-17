const player1Score = document.getElementById('player-1-score')
const player2Score = document.getElementById('player-2-score')

let gameStarting = true

player1Score.innerText = formatNumber(0)
player2Score.innerText = formatNumber(0)

function formatNumber(number) {
    return number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}

function angleCalculator(x1, y1, x2, y2) {
    console.log(`(${x1}, ${y1}), (${x2}, ${y2})`)
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
    let adjacent = differenceInX;
    console.log(opposite)
    console.log(adjacent)
    console.log(opposite / adjacent)
    console.log(degreesToRadians(opposite / adjacent))
    let angle = Math.atan(degreesToRadians(opposite / adjacent))

    if (!angle) return 180
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
        let player2 = document.getElementById('player-2')
        let player1Score = document.getElementById('player-1-score')
        let player2Score = document.getElementById('player-2-score')
        let endPrompt = document.getElementById('end-prompt')

        let movingBall = setInterval(() => {
            if (this.direction === 'left') {
                ball.style['left'] = `${parseInt(getComputedStyle(ball)['left']) - 10}px`

                if (parseInt(getComputedStyle(ball)['left']) <= 580) {
                    player2Score.innerText = formatNumber(parseInt(player2Score.innerText) + 1)

                    if (parseInt(player2Score.innerText) >= 10) {
                        endPrompt.hidden = false
                        document.body.innerHTML = document.body.innerHTML.replace('$player', '2')
                        clearInterval(movingBall)
                        return
                    }
                    this.resetBall()
                }
                if (ball.getBoundingClientRect().left <= player1.getBoundingClientRect().right && ball.getBoundingClientRect().left >= player1.getBoundingClientRect().left && ball.getBoundingClientRect().bottom >= player1.getBoundingClientRect().top && ball.getBoundingClientRect().top <= player1.getBoundingClientRect().bottom) {
                    this.direction = 'right'
                    // console.log(`Player top: ${player1.getBoundingClientRect().top}`)
                    // console.log(`Ball top: ${ball.getBoundingClientRect().top}`)
                    // console.log(`Player bottom: ${player1.getBoundingClientRect().bottom}`)
                    // console.log(`Ball bottom: ${ball.getBoundingClientRect().bottom}`)
                    // console.log(`Player left: ${player1.getBoundingClientRect().left}`)
                    // console.log(`Ball left: ${ball.getBoundingClientRect().left}`)
                    // console.log(`Player right: ${player1.getBoundingClientRect().right}`)
                    // console.log(`Ball right: ${ball.getBoundingClientRect().right}`)
                    console.log(angleCalculator((player1.getBoundingClientRect().bottom + player1.getBoundingClientRect().top) / 2, player1.getBoundingClientRect().right, (ball.getBoundingClientRect().bottom + ball.getBoundingClientRect().top) / 2, (ball.getBoundingClientRect().right + ball.getBoundingClientRect().left) / 2))
                }
            }
            if (this.direction === 'right') {
                ball.style['left'] = `${parseInt(getComputedStyle(ball)['left']) + 10}px`

                if (parseInt(getComputedStyle(ball)['left']) >= 1350) {
                    player1Score.innerText = formatNumber(parseInt(player1Score.innerText) + 1)

                    if (parseInt(player1Score.innerText) >= 10) {
                        endPrompt.hidden = false
                        document.body.innerHTML = document.body.innerHTML.replace('$player', '1')
                        clearInterval(movingBall)
                        return
                    }
                    this.resetBall(ball)
                }
                if (ball.getBoundingClientRect().right >= player2.getBoundingClientRect().left && ball.getBoundingClientRect().right <= player2.getBoundingClientRect().right && ball.getBoundingClientRect().bottom >= player2.getBoundingClientRect().top && ball.getBoundingClientRect().top <= player2.getBoundingClientRect().bottom) {
                    console.log('hi2')
                    this.direction = 'left'
                }
            }
            // console.log(ball.style['left'])
        }, 20)
    }
    resetBall() {
        ball.style['left'] = '750px'
    }
}

function main() {
    let gameContainer = document.getElementById('game-container')
    let game = new Game(750, 750);

    let ball;
    let keys = {};

    document.addEventListener('keydown', (event) => {
        let key = event.key
        keys[key] = true;

        if (gameStarting) {
            let startPrompt = document.getElementById('start-prompt')
            startPrompt.hidden = true

            let element = document.getElementById('ball')
            element.hidden = false

            ball = new Ball('left', 10)

            gameStarting = false
        } else {
            let player1 = document.getElementById('player-1')
            let player2 = document.getElementById('player-2')

            if (key === 'w') {
                if (parseInt(getComputedStyle(player1)['top']) <= 80) return;
                player1.style['top'] = `${parseInt(getComputedStyle(player1)['top']) - 20 }px`
            } else if (key === 's') {
                if (parseInt(getComputedStyle(player1)['top']) >= 760) return;
                player1.style['top'] = `${parseInt(getComputedStyle(player1)['top']) + 20 }px`
            } else if (key === 'ArrowUp') {
                if (parseInt(getComputedStyle(player2)['top']) <= 80) return;
                player2.style['top'] = `${parseInt(getComputedStyle(player2)['top']) - 20 }px`
            } else if (key === 'ArrowDown') {
                if (parseInt(getComputedStyle(player2)['top']) >= 760) return;
                player2.style['top'] = `${parseInt(getComputedStyle(player2)['top']) + 20 }px`
            }
            console.log(`Player 1: ${getComputedStyle(player1)['top']}`)
            console.log(`Player 2: ${getComputedStyle(player2)['top']}`)
        }
    })

    window.addEventListener('keyup', (event) => {
        let key = event.key
        delete keys[key];
    });
    
    function render() {
        element.textContent = JSON.stringify(keys);
        requestAnimationFrame(render);
    }
    
    render()

    gameContainer.addEventListener('contextmenu', (event) => {
        event.preventDefault()
    });
}

main()