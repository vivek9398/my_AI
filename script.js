document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const roleGrid = document.getElementById('roleGrid');
    const chatContainer = document.getElementById('chatContainer');
    const backButton = document.getElementById('backButton');
    const currentRoleElement = document.getElementById('currentRole');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    
    let currentRole = null;
    let conversationHistory = [];
    
    // Initialize the role selection grid
    function initializeRoleGrid() {
        roleGrid.innerHTML = '';
        
        roles.forEach(role => {
            const roleCard = document.createElement('div');
            roleCard.className = 'role-card';
            roleCard.dataset.roleId = role.id;
            
            roleCard.innerHTML = `
                <div class="role-icon">
                    <i class="fas ${role.icon}"></i>
                </div>
                <h3>${role.name}</h3>
                <p>${role.description}</p>
            `;
            
            // Add click event to show chat interface
            roleCard.addEventListener('click', () => selectRole(role));
            
            roleGrid.appendChild(roleCard);
        });
    }

    // Select a role and show the chat interface
    function selectRole(role) {
        currentRole = role;
        currentRoleElement.textContent = role.name;
        
        // Reset conversation history
        conversationHistory = [];
        
        // Show chat interface and hide role grid
        roleGrid.parentElement.style.display = 'none';
        chatContainer.style.display = 'flex';
        
        // Clear previous messages
        chatMessages.innerHTML = '';
        
        // Add AI greeting message
        addMessage(role.greeting, 'ai');
        
        // Add knowledge areas as a welcome message
        const knowledgeMessage = `
            <p>I can assist you with topics including:</p>
            <ul style="margin-top: 10px; margin-left: 20px;">
                ${role.knowledge.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p style="margin-top: 10px;">How can I help you today?</p>
        `;
        addMessage(knowledgeMessage, 'ai');
    }

    // Add a message to the chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.innerHTML = text;
        chatMessages.appendChild(messageElement);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Process user message and generate AI response
    function processUserMessage(message) {
        if (!message.trim()) return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Generate a simple response based on the role
        setTimeout(() => {
            const response = generateSimpleResponse(currentRole, message);
            addMessage(response, 'ai');
        }, 500);
    }

    // Generate a simple AI response based on the role and user message
    function generateSimpleResponse(role, message) {
        const lowercaseMessage = message.toLowerCase();
        
        // Check for keywords in the message
        if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
            return `Hello! I'm your ${role.name} assistant. How can I help you today?`;
        }
        
        if (lowercaseMessage.includes('help') || lowercaseMessage.includes('can you')) {
            return `As a ${role.name}, I can help you with various topics related to ${role.description.toLowerCase()}. What specific information are you looking for?`;
        }
        
        if (lowercaseMessage.includes('thank')) {
            return `You're welcome! Feel free to ask if you have any other questions about ${role.name.toLowerCase()} topics.`;
        }
        
        // Default response
        return `As a ${role.name}, I'd approach this by considering the context and specific details. Could you provide more information about what you're looking for?`;
    }

    // Event listeners
    backButton.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        roleGrid.parentElement.style.display = 'block';
        currentRole = null;
    });
    
    sendButton.addEventListener('click', () => {
        const message = userInput.value;
        processUserMessage(message);
        userInput.value = '';
    });
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
    
    // Initialize the application
    initializeRoleGrid();
});