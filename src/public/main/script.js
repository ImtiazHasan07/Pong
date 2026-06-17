const canvas = document.getElementById('game')
const context = canvas.getContext('2d')

function angleCalculator(x1, y1, x2, y2) {
    console.log(`(${x1}, ${y1}), (${x2}, ${y2})`)
    // let differenceInX;
    // let differenceInY;
    // if (x1 > x2 || y1 > y2) {
    //     differenceInX = x1 - x2
    //     differenceInY = y1 - y2
    // } else {
    //     differenceInX = x2 - x1
    //     differenceInY = y2 - y1
    // }
    let differenceInX = difference(x1, x2);
    let differenceInY = difference(y1, y2);

    let opposite = differenceInY;
    let adjacent = differenceInX;

    console.log(opposite)
    console.log(adjacent)
    console.log(opposite / adjacent)
    let radianAngle = Math.atan(degreesToRadians(opposite / adjacent))
    let degreesAngle = radiansToDegrees(radianAngle)

    return degreesAngle

    // if (!angle) return 180
    // return angle
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

function difference(a, b) {
    return a > b ? a - b : b - a
}


function main() {
    let gameStarting = true

    let paddleWidth = 10
    let paddleHeight = 100

    let player_1 = {
        score: 0,
        x: 10,
        y: canvas.height / 2 - 75,
        width: paddleWidth,
        height: paddleHeight
    }

    let player_2 = {
        score: 0,
        x: canvas.width - 20,
        y: canvas.height / 2 - 75,
        width: paddleWidth,
        height: paddleHeight
    }

    let ball = {
        originalX: canvas.width / 2 - 20,
        originalY: canvas.height / 2 - 30,
        originalSpeed: 5,
        originalDirection: 180,
        x: null,
        y: null,
        width: 10,
        height: 10,
        speed: null,
        direction: null
    }
    ball.x = ball.originalX
    ball.y = ball.originalY
    ball.speed = ball.originalSpeed
    ball.direction = ball.originalDirection

    let keys = {};

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#000000'
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#ffffff';
        context.fillRect(player_1.x, player_1.y, player_1.width, player_1.height);

        context.fillStyle = '#ffffff';
        context.fillRect(player_2.x, player_2.y, player_2.width, player_2.height);

        context.beginPath()
        context.setLineDash([10, 15])
        context.moveTo(canvas.width / 2, 10)
        context.lineTo(canvas.width / 2, canvas.height)
        context.lineWidth = 10
        context.strokeStyle = '#ffffff'
        context.stroke()

        context.font = '100px Arial';
        context.fillText(`${formatNumber(player_1.score)}`, 50, 100);

        context.font = '100px Arial';
        context.fillText(`${formatNumber(player_2.score)}`, canvas.width - 150, 100);

        if (gameStarting) {
            context.font = '50px Arial';
            context.fillText('Press any key to begin', 125, canvas.height / 2);
        } else {
            context.fillStyle = '#ffffff';
            context.fillRect(ball.x, ball.y, 10, 10)
        }
    }

    document.addEventListener('keydown', (event) => {
        let key = event.key
        keys[key] = true;

        if (gameStarting) {
            let ballMovement = setInterval(() => {
                ball.x += ball.speed * Math.cos(degreesToRadians(ball.direction));
                ball.y += ball.speed * Math.sin(degreesToRadians(ball.direction));

                if (ball.y < 0 || ball.y > canvas.height) {
                    ball.direction = -ball.direction
                    // ball.direction = 180 - ball.direction
                }
                console.log(ball.direction)

                if (ball.x <= player_1.x + player_1.width && ball.y >= player_1.y && ball.y <= player_1.y + player_1.height) {
                    if (Math.floor(Math.random() * 2) + 1 === 1) {
                        ball.direction += 45
                    } else {
                        ball.direction -= 45
                    }
                    // ball.direction = 180 - ball.direction
                }

                if (ball.x >= player_2.x && ball.y >= player_2.y && ball.y <= player_2.y + player_2.height) {
                    // if (Math.floor(Math.random() * 2) + 1 === 1) {
                    //     ball.direction += 45
                    // } else {
                    //     ball.direction -= 45
                    // }
                    // ball.direction = 180 - ball.direction
                }

                if (ball.x <= 0) {
                    ball.x = ball.originalX
                    ball.y = ball.originalY
                    player_2.score += 1
                    ball.x = ball.originalX
                    ball.y = ball.originalY
                    ball.speed = ball.originalSpeed
                    ball.direction = ball.originalDirection

                } else if (ball.x >= 750) {
                    ball.x = ball.originalX
                    ball.y = ball.originalY
                    player_1.score += 1
                    ball.x = ball.originalX
                    ball.y = ball.originalY
                    ball.speed = ball.originalSpeed
                    ball.direction = ball.originalDirection
                }
                window.requestAnimationFrame(draw);
                if (player_1.score >= 10 || player_2.score >= 10) {
                    ball.x = -500
                    context.font = '50px Arial';
                    console.log(`Player ${player_1.score >= 10 ? 1 : 2} won!`, 125, canvas.height / 2)
                    context.fillText(`Player ${player_1.score >= 10 ? 1 : 2} won!`, 125, canvas.height / 2);
                    window.requestAnimationFrame(draw);
                    clearInterval(ballMovement);
                }
                // ball.x = ball.originalX
            }, 1)

            gameStarting = false
        } else {
            if (key === 'w') {
                if (player_1.y <= 0) return;
                player_1.y -= 20
            } else if (key === 's') {
                if (player_1.y >= 660) return;
                player_1.y += 20
            } else if (key === 'ArrowUp') {
                if (player_2.y <= 0) return;
                player_2.y -= 20
            } else if (key === 'ArrowDown') {
                if (player_2.y >= 660) return;
                player_2.y += 20
            }
            // console.log(`Player 1: ${player_1.y}`)
            // console.log(`Player 2: ${player_2.y}`)
        }
    })

    window.addEventListener('keyup', (event) => {
        let key = event.key
        delete keys[key];
    });

    function render() {
        requestAnimationFrame(render);
    }

    render()

    game.addEventListener('contextmenu', (event) => {
        event.preventDefault()
    });

    draw();
}

main()


function formatNumber(number) {
    return number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}