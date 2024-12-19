let ws;
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const usernameInput = document.getElementById('username');

function connectWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'history') {
            data.messages.forEach(message => displayMessage(message));
        } else if (data.type === 'message') {
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

function sendMessage() {
    const username = usernameInput.value.trim();
    const text = messageInput.value.trim();
    
    if (!username || !text) return;
    
    const message = {
        username,
        text
    };
    
    ws.send(JSON.stringify(message));
    messageInput.value = '';
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initial connection
connectWebSocket();