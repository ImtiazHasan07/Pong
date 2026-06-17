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

class Piece {
    static id = 1;

    constructor(name, colour, coordinate) {
        this.name = name;
        this.colour = colour;
        this.coordinate = coordinate;
        this.id = Piece.id
        this.create()
    }

    toString() {
        return `${this.name} ${this.colour} ${this.coordinate} ${this.id}`;
    }

    getMoves() {}
}

function normalGame() {
    let whiteRook = new Rook('white', 'a1');
    // let whiteRook = new Rook('white', 'd4');
    let whiteKnight = new Knight('white', 'e4');
    // let whiteKnight = new Knight('white', 'b1');
    let whiteBishop = new Bishop('white', 'c1');
    let whiteQueen = new Queen('white', 'd1');
    // let whiteKing = new King('white', 'e1');
    let whiteKing = new King('white', 'g3');
    let whiteBishop2 = new Bishop('white', 'f1');
    let whiteKnight2 = new Knight('white', 'g1');
    let whiteRook2 = new Rook('white', 'h1');
    let whitePawn = new Pawn('white', 'a2');
    let whitePawn2 = new Pawn('white', 'b2');
    let whitePawn3 = new Pawn('white', 'c2');
    let whitePawn4 = new Pawn('white', 'd2');
    let whitePawn5 = new Pawn('white', 'e2');
    let whitePawn6 = new Pawn('white', 'f2');
    let whitePawn7 = new Pawn('white', 'g2');
    let whitePawn8 = new Pawn('white', 'h2');
    let blackRook = new Rook('black', 'a8');
    let blackKnight = new Knight('black', 'b8');
    let blackBishop = new Bishop('black', 'c8');
    let blackQueen = new Queen('black', 'd8');
    let blackKing = new King('black', 'e8');
    let blackBishop2 = new Bishop('black', 'f8');
    let blackKnight2 = new Knight('black', 'g8');
    let blackRook2 = new Rook('black', 'h8');
    let blackPawn = new Pawn('black', 'a7');
    let blackPawn2 = new Pawn('black', 'b7');
    let blackPawn3 = new Pawn('black', 'c7');
    let blackPawn4 = new Pawn('black', 'd7');
    let blackPawn5 = new Pawn('black', 'e7');
    let blackPawn6 = new Pawn('black', 'f7');
    let blackPawn7 = new Pawn('black', 'g7');
    let blackPawn8 = new Pawn('black', 'h7');

    let getPieceFromId = (id) => [whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop2, whiteKnight2, whiteRook2, whitePawn, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8, blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop2, blackKnight2, blackRook2, blackPawn, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8].filter((element) => String(element.id) === id)[0]

    console.log(whiteKing.getMoves())
    // console.log(whiteRook.getMoves())
    console.log(whiteKnight.getMoves())

    let pieces = document.getElementsByClassName('pieces')

    Array.from(pieces).forEach((piece) => {
        piece.addEventListener('dragstart', (event) => {
            console.log(event.target.id)
            event.dataTransfer.setData('text/plain', event.target.id);
        })
    })

    Array.from(squares).forEach((square) => {
        square.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        square.addEventListener('drop', (event) => {
            event.preventDefault();

            let data = event.dataTransfer.getData('text/plain');
            let element = document.getElementById(data)

            console.log(element)
            console.log(getPieceFromId(element.id).coordinate)
            console.log(event.target)
            if (element.id === event.target.id) return

            console.log(getPieceFromId(element.id))
            console.log(getPieceFromId(element.id).getMoves())

            if (event.target.tagName.toLowerCase() === 'img') {
                if (!getPieceFromId(element.id).getMoves().includes(square.id)) return

                if (Array.from(event.target.classList).includes('king')) return

                // getPieceFromId(element.id).coordinate = square.id
                getPieceFromId(element.id).changeCoordinates(square.id)
                square.appendChild(element)
                event.target.remove()
            } else {
                if (!getPieceFromId(element.id).getMoves().includes(event.target.id)) return
                // getPieceFromId(element.id).coordinate = square.id
                getPieceFromId(element.id).changeCoordinates(square.id)
                event.target.appendChild(element);
            }
        })
    })
}

const gameContainer = document.getElementById('game_container')
gameContainer.addEventListener('contextmenu', (event) => {
    event.preventDefault()
});

normalGame()