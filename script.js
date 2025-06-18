document.addEventListener('DOMContentLoaded', () => {
    const roleGrid = document.getElementById('roleGrid');
    const chatContainer = document.getElementById('chatContainer');
    const backButton = document.getElementById('backButton');
    const currentRoleElement = document.getElementById('currentRole');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const apiKeyInput = document.getElementById('apiKey');
    const saveApiKeyButton = document.getElementById('saveApiKey');
    const modelSelect = document.getElementById('modelSelect');
    
    let currentRole = null;
    let conversationHistory = [];
    let useFallback = true; // Default to fallback mode
    
    // Check for saved API key in localStorage
    if (localStorage.getItem('openai_api_key')) {
        apiKeyInput.value = localStorage.getItem('openai_api_key');
        config.openai.apiKey = localStorage.getItem('openai_api_key');
        useFallback = false; // Use API if key is available
    }
    
    // Check for saved model preference
    if (localStorage.getItem('openai_model')) {
        modelSelect.value = localStorage.getItem('openai_model');
        config.openai.model = localStorage.getItem('openai_model');
    }

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
        
        // Add initial messages to conversation history
        conversationHistory.push({
            role: "system",
            content: `You are an AI assistant specialized as a ${role.name}. ${role.description}. 
                     You have expertise in: ${role.knowledge.join(', ')}.
                     Respond to all queries from the perspective of a ${role.name}.`
        });
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
    
    // Add a loading indicator
    function addLoadingIndicator() {
        const loadingElement = document.createElement('div');
        loadingElement.className = 'loading-indicator';
        loadingElement.id = 'loadingIndicator';
        loadingElement.innerHTML = `
            Thinking
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        chatMessages.appendChild(loadingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Remove loading indicator
    function removeLoadingIndicator() {
        const loadingElement = document.getElementById('loadingIndicator');
        if (loadingElement) {
            loadingElement.remove();
        }
    }
    
    // Show error message
    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        chatMessages.appendChild(errorElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Process user message and generate AI response
    async function processUserMessage(message) {
        if (!message.trim()) return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Add to conversation history
        conversationHistory.push({
            role: "user",
            content: message
        });
        
        // Check if we should use fallback or API
        if (useFallback || !config.openai.apiKey) {
            // Use fallback response generator with a slight delay to simulate thinking
            setTimeout(() => {
                const response = generateFallbackResponse(currentRole, message);
                addMessage(response, 'ai');
                
                // Add to conversation history
                conversationHistory.push({
                    role: "assistant",
                    content: response
                });
            }, 800);
            return;
        }
        
        // Show loading indicator for API mode
        addLoadingIndicator();
        
        try {
            const response = await generateAIResponse(message);
            removeLoadingIndicator();
            
            if (response) {
                addMessage(response, 'ai');
                
                // Add to conversation history
                conversationHistory.push({
                    role: "assistant",
                    content: response
                });
            }
        } catch (error) {
            removeLoadingIndicator();
            showError(`Error: ${error.message || "Failed to get response from AI"}`);
            console.error("AI Response Error:", error);
        }
    }

    // Generate AI response using OpenAI API
    async function generateAIResponse(message) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.openai.apiKey}`
                },
                body: JSON.stringify({
                    model: config.openai.model,
                    messages: conversationHistory,
                    temperature: config.openai.temperature,
                    max_tokens: config.openai.max_tokens
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("OpenAI API Error:", error);
            throw error;
        }
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
    
    // Save API key
    saveApiKeyButton.addEventListener('click', () => {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            localStorage.setItem('openai_api_key', apiKey);
            config.openai.apiKey = apiKey;
            useFallback = false; // Switch to API mode
            alert('API key saved successfully! The AI will now use the OpenAI API for responses.');
        } else {
            // Clear API key and switch to fallback mode
            localStorage.removeItem('openai_api_key');
            config.openai.apiKey = '';
            useFallback = true;
            alert('API key cleared. Using fallback mode for responses.');
        }
    });
    
    // Save model selection
    modelSelect.addEventListener('change', () => {
        const selectedModel = modelSelect.value;
        localStorage.setItem('openai_model', selectedModel);
        config.openai.model = selectedModel;
    });
    
    // Initialize the application
    initializeRoleGrid();
});