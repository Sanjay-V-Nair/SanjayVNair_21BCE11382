// Import modules
const { initGameState } = require('./game/gameState');
const websocketServer = require('./server/webSocketServer');

// Initialize the game state at server start
initGameState();

// Start WebSocket server
websocketServer.start();

console.log('Game server started and WebSocket server running on ws://localhost:8080');
