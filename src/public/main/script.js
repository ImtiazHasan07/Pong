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

function main() {
    let gameContainer = document.getElementById('game-container')
    let game = new Game(750, 750);

    document.addEventListener('keydown', (event) => {
        let key = event.key
        // console.log(event)
    
        if (gameStarting) {
            let startPrompt = document.getElementById('start-prompt')
            startPrompt.hidden = true
    
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