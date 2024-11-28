const net = require('net');
const readline = require('readline-sync');

class ChatClient {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.username = '';
    }

    connect() {
        // Prompt for username
        this.username = readline.question('Enter your username: ');

        this.socket = new net.Socket();
        
        this.socket.connect(this.port, this.host, () => {
            console.log(`Connected to chat server at ${this.host}:${this.port}`);
            
            // Start message receiving thread
            this.startReceiving();
            
            // Start sending messages
            this.startSending();
        });

        this.socket.on('error', (err) => {
            console.error('Connection error:', err);
        });

        this.socket.on('close', () => {
            console.log('Disconnected from server');
            process.exit(0);
        });
    }

    startReceiving() {
        this.socket.on('data', (data) => {
            console.log(data.toString().trim());
        });
    }

    startSending() {
        const sendMessage = () => {
            const message = readline.question('');
            if (message.toLowerCase() === 'exit') {
                this.socket.end();
                process.exit(0);
            }
            
            const fullMessage = `${this.username}: ${message}`;
            this.socket.write(fullMessage);
            
            // Continue sending messages
            sendMessage();
        };

        sendMessage();
    }
}

// Connect to server
const client = new ChatClient('localhost', 3000);
client.connect();
