function isValidMove(row, col, player, gameState) {
    // Check bounds
    if (row < 0 || row >= 5 || col < 0 || col >= 5) return false;

    // Check if the cell is occupied by a friendly character
    const targetCell = gameState[row][col];
    if (targetCell && targetCell.player === player) return false;

    return true;
}

function checkForWinner(gameState) {
    const remainingA = gameState.flat().filter(cell => cell && cell.player === 'A').length;
    const remainingB = gameState.flat().filter(cell => cell && cell.player === 'B').length;

    if (remainingA === 0) return 'B';
    if (remainingB === 0) return 'A';
    return null;
}

module.exports = { isValidMove, checkForWinner };
