# Chat Project

Welcome to the Chat Project! This project is a simple chat application that allows users to communicate in real-time.

## Features

- Real-time messaging
- User authentication
- Private and group chats
- Message history
- WebSocket support for live updates
- REST API for message retrieval and persistence

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ahmed-n-abdeltwab/chat.git
    ```

2. Navigate to the project directory:

    ```bash
    cd chat
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Build the project:

    ```bash
    npm run build
    ```

5. Start the server:

    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Sending Messages

1. Enter your username in the input field.
2. Type your message in the message input field.
3. Click the "Send" button or press "Enter" to send the message.

### Viewing Message History

- The message history is automatically loaded when you open the chat application.

## API Endpoints

### GET /api/messages

- Retrieves all messages from the database.

### POST /api/messages

- Saves a new message to the database.
- Request body should contain:

  ```json
  {
    "username": "your_username",
    "text": "your_message"
  }
  ```

## WebSocket

- The application uses WebSocket for real-time messaging.

- The WebSocket server is integrated with the HTTP server and listens on the same port.

## Scripts

The following scripts are available:

- `start`: Runs the compiled server.
- `dev`: Starts the server with TypeScript support and restarts on changes.
- `build`: Compiles the TypeScript code.
- `lint`: Lints the TypeScript files.
- `lint:fix`: Lints and fixes the TypeScript files.
- `format`: Formats the code using Prettier.
- `format:check`: Checks the code formatting using Prettier.
- `test`: Runs the tests using Jest.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [Ahmed N. Abdeltwab](https://github.com/ahmed-n-abdeltwab).
