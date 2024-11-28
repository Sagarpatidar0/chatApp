# Real-Time Chat Application

## Overview
This is a simple real-time chat application built using Node.js sockets, supporting multiple concurrent client connections.

## Features
- Real-time messaging
- Multiple client support
- Simple text-based interface
- Broadcast messaging

## Technical Details
- Language: Node.js
- Concurrency: Using Node.js's native socket handling
- Communication: Raw socket communication

## Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)

## Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application
1. Start the server:
   ```bash
   node server.js
   ```

2. In separate terminal windows, start clients:
   ```bash
   node client.js
   ```

## Usage
- When prompted, enter a username
- Type messages and press Enter to send
- Type 'exit' to disconnect

## Design Choices
- Used native Node.js `net` module for socket communication
- Implemented thread-like behavior using event-driven architecture
- Simple broadcast mechanism that excludes the sender

## Limitations
- No persistent message history
- Basic error handling
- No authentication mechanism

## Potential Improvements
- Add user authentication
- Implement private messaging
- Persist chat history
- Add more robust error handling
