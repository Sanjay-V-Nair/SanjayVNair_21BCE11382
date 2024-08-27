const { updateGameState, getGameState } = require('../game/gameState');
const { movePawn, moveHero1, moveHero2 } = require('../game/characters');
const { isValidMove, checkForWinner } = require('../game/rules');

function onConnection(ws) {
    console.log('A player connected');
    // Handle initial setup, assign player A or B, etc.
}

function onMessage(ws, message) {
    const { player, piece, move } = JSON.parse(message);
    const gameState = getGameState();

    // Handle character movement
    let newPosition;
    if (piece.type === 'Pawn') {
        newPosition = movePawn(piece, move);
    } else if (piece.type === 'Hero1') {
        newPosition = moveHero1(piece, move);
    } else if (piece.type === 'Hero2') {
        newPosition = moveHero2(piece, move);
    }

    if (!isValidMove(newPosition.newRow, newPosition.newCol, player, gameState)) {
        ws.send(JSON.stringify({ error: 'Invalid move' }));
        return;
    }

    // Update game state
    updateGameState(newPosition.newRow, newPosition.newCol, piece);

    // Check for a winner
    const winner = checkForWinner(gameState);
    if (winner) {
        ws.send(JSON.stringify({ winner }));
        return;
    }

    // Broadcast updated game state to all clients
    broadcastGameState();
}

function onClose(ws) {
    console.log('A player disconnected');
}

function broadcastGameState() {
    const gameState = getGameState();
    wss.clients.forEach(client => client.send(JSON.stringify({ gameState })));
}

module.exports = { onConnection, onMessage, onClose };
