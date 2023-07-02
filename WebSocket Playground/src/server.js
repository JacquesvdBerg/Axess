const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store all connected WebSocket clients
const clients = new Set();

wss.on('connection', (ws) => {
    // Add the new client to the clients set
    clients.add(ws);

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.command === 'openDoor') {
                broadcast({ status: 'success', message: 'Door opened', areaID: data.areaID }); // Broadcast the message to all clients
                console.log({ status: 'success', message: 'Door opened' })
                // Perform any other necessary actions on the server-side
            } else {
                ws.send(JSON.stringify({ status: 'failed', message: 'Unknown Command' }));
                console.log({ status: 'failed', message: 'Unknown Command' });
            }
        } catch (error) {
            ws.send(JSON.stringify({ status: 'failed', message: 'Invalid Message Format' }));
            console.log({ status: 'failed', message: 'Invalid Message Format' })
            // ws.send('Invalid message format');
            console.log(error);
        }
    });

    ws.on('close', () => {
        // Remove the client from the clients set when they disconnect
        clients.delete(ws);
    });

});

// Function to broadcast a message to all connected clients
function broadcast(message) {
    const jsonMessage = JSON.stringify(message); // Convert the message to a JSON string

    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(jsonMessage);
        }
    });
}

const port = process.env.PORT || 8999;
server.listen(port, () => {
    console.log(`Server started on port ${port} :)`);
});
