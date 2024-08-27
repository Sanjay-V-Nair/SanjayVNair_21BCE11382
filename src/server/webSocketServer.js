const WebSocket = require('ws');
const { onConnection, onMessage, onClose } = require('./eventHandlers');

function start() {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('connection', (ws) => {
        onConnection(ws);

        ws.on('message', (message) => onMessage(ws, message));

        ws.on('close', () => onClose(ws));
    });

    console.log('WebSocket server running on ws://localhost:8080');
}

module.exports = { start };

/////


// Initialize WebSocket Server on port 8080
// const wss = new WebSocket.Server({ port: 8080 });

// // Initialize game state
// let gameState = initializeGame();

// wss.on('connection', (ws) => {
//     console.log('New client connected!');

//     // Send initial game state to the client
//     ws.send(JSON.stringify({ gameState }));

//     ws.on('message', (message) => {
//         const { player, character, direction } = JSON.parse(message);

//         // Process the move and update the game state
//         const result = handleMove(player, character, direction, gameState);

//         if (result.error) {
//             ws.send(JSON.stringify({ error: result.error }));
//         } else {
//             // Broadcast updated game state to all connected clients
//             const gameStateUpdate = JSON.stringify({ gameState });
//             wss.clients.forEach(client => {
//                 if (client.readyState === WebSocket.OPEN) {
//                     client.send(gameStateUpdate);
//                 }
//             });

//             // Check if the game is over and announce the winner
//             if (result.winner) {
//                 wss.clients.forEach(client => {
//                     if (client.readyState === WebSocket.OPEN) {
//                         client.send(JSON.stringify({ winner: result.winner }));
//                     }
//                 });
//             }
//         }
//     });

//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });
// });

// console.log('WebSocket server is running on ws://localhost:8080');
