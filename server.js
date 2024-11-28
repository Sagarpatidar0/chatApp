const net = require('net');

class ChatServer {
    constructor(port) {
        this.port = port;
        this.clients = new Set();
    }

    start() {
        this.server = net.createServer((socket) => {
            console.log('New client connected');
            
            // Add client to set of connected clients
            this.clients.add(socket);

            // Handle incoming messages
            socket.on('data', (data) => {
                const message = data.toString().trim();
                console.log(`Received message: ${message}`);
                
                // Broadcast message to all clients except sender
                this.broadcast(message, socket);
            });

            // Handle client disconnection
            socket.on('end', () => {
                console.log('Client disconnected');
                this.clients.delete(socket);
            });

            // Handle errors
            socket.on('error', (err) => {
                console.error('Socket error:', err);
                this.clients.delete(socket);
            });
        });

        this.server.listen(this.port, () => {
            console.log(`Chat server listening on port ${this.port}`);
        });
    }

    broadcast(message, sender) {
        for (let client of this.clients) {
            if (client !== sender) {
                try {
                    client.write(`${message}\n`);
                } catch (err) {
                    console.error('Broadcast error:', err);
                }
            }
        }
    }
}

// Start server on port 3000
const chatServer = new ChatServer(3000);
chatServer.start();
