const canvas = document.getElementById('game')
const context = canvas.getContext('2d')

function main() {
    let x = canvas.width / 2 - 20
    let keys = {};

    let player_1 = {
        x: x,
        y: y,
        speed: 10,
    }

    let player_2 = {
        x: x,
        y: y,
        speed: 10,
    }

    let ball = {
        x: x,
        y: y,
        speed: 10,
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#000000'
        context.fillStyle = '#000000'
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#ffffff';
        context.fillRect(10, canvas.height / 2 - 75, 10, 100);

        context.fillStyle = '#ffffff';
        context.fillRect(canvas.width - 20, canvas.height / 2 - 75, 10, 100);

        context.fillStyle = '#ffffff';
        context.fillRect(x, canvas.height / 2 - 30, 10, 10);

        setInterval(() => x -= 10, 1000)

        context.beginPath()
        context.setLineDash([10, 15])
        context.moveTo(canvas.width / 2, 10)
        context.lineTo(canvas.width / 2, canvas.height)
        context.lineWidth = 10
        context.strokeStyle = '#ffffff'
        context.stroke()

        context.font = '100px Arial';
        context.fillText(`${formatNumber(0)}`, 50, 100);

        context.font = '100px Arial';
        context.fillText(`${formatNumber(0)}`, canvas.width - 150, 100);

        // context.font = '50px Arial';
        // context.fillText('Press any key to begin', 125, canvas.height / 2);

        // context.font = '50px Arial';
        // let winner = '1'
        // context.fillText(`Player ${winner} won!`, 125, canvas.height / 2); 

        window.requestAnimationFrame(draw);
    }
    draw();

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


function formatNumber(number) {
    return number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}