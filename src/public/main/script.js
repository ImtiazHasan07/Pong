const player1Score = document.getElementById('player-1-score')
const player2Score = document.getElementById('player-2-score')

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
    let game = new Game(750, 750);
}

const gameContainer = document.getElementById('game_container')
gameContainer.addEventListener('contextmenu', (event) => {
    event.preventDefault()
});

main()