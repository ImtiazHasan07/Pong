const canvas = document.getElementById('game')
const context = canvas.getContext('2d')

context.fillStyle = '#000000'

let x = 10
let y = 0
let width = 350
let height = 350
context.fillRect(x, y, canvas.width, canvas.height);