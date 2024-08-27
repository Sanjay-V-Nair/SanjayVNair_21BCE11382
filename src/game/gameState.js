let gameState = [];

function initGameState() {
    gameState = Array(5).fill().map(() => Array(5).fill(null));
}

function updateGameState(row, col, character) {
    gameState[row][col] = character;
}

function resetGameState() {
    initGameState();
}

function getGameState() {
    return gameState;
}

module.exports = { initGameState, updateGameState, resetGameState, getGameState };
