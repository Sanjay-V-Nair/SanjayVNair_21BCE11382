const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")

const width = 5

let playerGo = 'black'
playerDisplay.textContent = "black"

// Start Pieces for a 5x5 Board
const startPieces = [
    bishop, bishop, rook, bishop, bishop,
    pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn,
    bishop, bishop, rook, bishop, bishop,
]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement("div")
        square.classList.add("square")
        square.innerHTML = startPiece

        // Make pieces draggable (if they exist)
        if (startPiece) {
            square.setAttribute('draggable', true)
        }

        // Set square ID
        square.setAttribute('square-id', i)

        // Alternate square colors
        const row = Math.floor(i / 5) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? 'beige' : 'brown')
        } else {
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige')
        }

        // Add pieces with color classes (optional)
        if (i < 10) { // First two rows
            square.classList.add('black')
        } else if (i >= 15) { // Last two rows
            square.classList.add('white')
        }

        gameBoard.append(square)
    })
}

createBoard()



// Drag and Drop
const allSquares = document.querySelectorAll("#gameboard .square")

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPositionId;
let draggedElement;

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()

    const valid = checkIfValid(e.target)

    // console.log(draggedElement)
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const opponentGo = playerGo === 'white' ? 'black' : 'white'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if (correctGo) {
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            changeGo()
            return
        }
    }
    if (taken && !takenByOpponent) {
        infoDisplay.textContent = "Invalid move"
        setTimeout(() => infoDisplay.textContent = "", 2000)
        return;
    }
    if (valid) {
        e.target.append(draggedElement)
        changeGo()
        return
    }

}

function checkIfValid(target) {

}


function changeGo() {
    if (playerGo === 'black') {
        reverseId()
        playerGo = 'white'
        playerDisplay.textContent = "white"
    } else {
        revertId()
        playerGo = 'black'
        playerDisplay.textContent = "black"
    }
}

function reverseId() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => {
        square.setAttribute('square-id', (width * width - 1) - i)
    })
}

function revertId() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => {
        square.setAttribute('square-id', i)
    })
}