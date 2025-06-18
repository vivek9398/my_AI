// Configuration for API keys and settings
const config = {
    // OpenAI API configuration
    openai: {
        apiKey: "", // This will be set by the user in the UI
        model: "gpt-3.5-turbo", // Default model
        temperature: 0.7,
        max_tokens: 500
    },
    
    // Add other AI provider configurations here as needed
    // For example:
    // anthropic: {
    //     apiKey: "",
    //     model: "claude-2"
    // }
};