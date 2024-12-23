let ws;
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const usernameInput = document.getElementById('username');

// Get API base URL from current location
const API_BASE_URL = `${window.location.protocol}//${window.location.host}/api`;

// Fetch messages from REST API
async function fetchMessages() {
    try {
        const response = await fetch(`${API_BASE_URL}/messages`);
        const data = await response.json();
        if (data.status === 'success') {
            data.data.forEach(message => displayMessage(message));
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

function connectWebSocket() {
    // Use relative WebSocket URL to match current protocol (ws/wss) and host
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    ws = new WebSocket(wsUrl);

    ws.onmessage = event => {
        const data = JSON.parse(event.data);

        if (data.type === 'message') {
            displayMessage(data.message);
        }
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
        // Try to reconnect after 5 seconds
        setTimeout(connectWebSocket, 5000);
    };
}

function displayMessage(message) {
    const messageElement = document.createElement('div');
    const isCurrentUser = message.username === usernameInput.value;
    messageElement.className = `message ${isCurrentUser ? 'sent' : 'received'}`;

    const usernameElement = document.createElement('div');
    usernameElement.className = 'username';
    usernameElement.textContent = message.username;

    const textElement = document.createElement('div');
    textElement.textContent = message.text;

    messageElement.appendChild(usernameElement);
    messageElement.appendChild(textElement);
    messages.appendChild(messageElement);

    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
    const username = usernameInput.value.trim();
    const text = messageInput.value.trim();

    if (!username || !text) return;

    const message = {
        username,
        text,
    };

    try {
        // Send message through WebSocket for real-time updates
        ws.send(JSON.stringify(message));

        // Also send to REST API for persistence
        await fetch(`${API_BASE_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        messageInput.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initial setup
fetchMessages();
connectWebSocket();
