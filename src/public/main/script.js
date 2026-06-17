const canvas = document.getElementById('game')
const context = canvas.getContext('2d')

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
        x: null,
        y: canvas.height / 2 - 30,
        width: 10,
        height: 10,
        // miliseconds: 100,
        miliseconds: 50,
        direction: -90
    }
    ball.x = ball.originalX

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
                if (ball.direction >= -180 && ball.direction < 0) {
                    // ball.x -= 10
                    ball.x -= 20
                } else if (ball.direction >= 0 && ball.direction <= 180) {
                    // ball.x += 10
                    ball.x += 20

                }
                if (ball.x <= player_1.x + player_1.width && ball.y >= player_1.y && ball.y <= player_1.y + player_1.height) {
                    if (ball.direction < 0) {
                        ball.direction = -ball.direction
                    }
                }

                if (ball.x >= player_2.x && ball.y >= player_2.y && ball.y <= player_2.y + player_2.height) {
                    if (ball.direction > 0) {
                        ball.direction = -ball.direction
                    }
                }

                if (ball.x <= 0) {
                    ball.x = ball.originalX
                    player_2.score += 1
                    ball.direction = 90
                } else if (ball.x >= 750) {
                    ball.x = ball.originalX
                    player_1.score += 1
                    ball.direction = -90
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
            }, ball.miliseconds)

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