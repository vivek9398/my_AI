// Fallback AI response generator when no API key is provided
// This simulates AI responses for demonstration purposes

function generateFallbackResponse(role, message) {
    const lowercaseMessage = message.toLowerCase();
    
    // Generic responses based on role
    switch(role.id) {
        case 'developer':
            if (lowercaseMessage.includes('javascript') || lowercaseMessage.includes('js')) {
                return "JavaScript is a versatile programming language primarily used for web development. It allows you to add interactive elements to websites. Would you like to know about a specific aspect of JavaScript?";
            } else if (lowercaseMessage.includes('python')) {
                return "Python is known for its readability and versatility. It's great for beginners and is used in web development, data science, AI, and more. What specific Python topic are you interested in?";
            } else if (lowercaseMessage.includes('framework') || lowercaseMessage.includes('library')) {
                return "There are many frameworks and libraries available depending on your programming language and needs. Popular ones include React, Angular, and Vue for JavaScript; Django and Flask for Python; and Spring for Java. Which technology stack are you working with?";
            }
            break;
            
        case 'designer':
            if (lowercaseMessage.includes('color') || lowercaseMessage.includes('palette')) {
                return "Color theory is fundamental to good design. Consider using complementary colors for contrast or analogous colors for harmony. Tools like Adobe Color or Coolors can help you create balanced color palettes. What kind of mood are you trying to convey with your design?";
            } else if (lowercaseMessage.includes('typography') || lowercaseMessage.includes('font')) {
                return "Typography greatly impacts user experience. For digital products, consider readability first - san-serif fonts often work well on screens. Limit yourself to 2-3 font families per project. Are you designing for print or digital?";
            } else if (lowercaseMessage.includes('layout') || lowercaseMessage.includes('grid')) {
                return "Grid systems provide structure and consistency to your designs. Consider using a 12-column grid for flexibility. Remember to maintain proper spacing and alignment for a clean, professional look. What kind of layout are you working on?";
            }
            break;
            
        case 'datascientist':
            if (lowercaseMessage.includes('machine learning') || lowercaseMessage.includes('ml')) {
                return "Machine learning involves training algorithms to make predictions or decisions based on data. Common techniques include regression, classification, clustering, and deep learning. What specific ML problem are you trying to solve?";
            } else if (lowercaseMessage.includes('data cleaning') || lowercaseMessage.includes('preprocessing')) {
                return "Data preprocessing is crucial for any analysis. This includes handling missing values, removing duplicates, normalizing data, and encoding categorical variables. What kind of data are you working with?";
            } else if (lowercaseMessage.includes('visualization') || lowercaseMessage.includes('chart')) {
                return "Data visualization helps communicate insights effectively. Choose the right chart type based on what you want to show: bar charts for comparisons, line charts for trends over time, scatter plots for correlations, etc. What insights are you trying to visualize?";
            }
            break;
            
        case 'doctor':
            if (lowercaseMessage.includes('symptom') || lowercaseMessage.includes('pain')) {
                return "While I can provide general health information, it's important to consult with a healthcare professional for personalized medical advice. Many symptoms can have multiple causes. What other information would you like to know about common health conditions?";
            } else if (lowercaseMessage.includes('diet') || lowercaseMessage.includes('nutrition')) {
                return "A balanced diet typically includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Nutritional needs can vary based on age, activity level, and health conditions. Are you interested in learning about specific dietary recommendations?";
            } else if (lowercaseMessage.includes('exercise') || lowercaseMessage.includes('workout')) {
                return "Regular physical activity offers numerous health benefits including improved cardiovascular health, stronger muscles and bones, and better mental health. The general recommendation is at least 150 minutes of moderate activity per week. What type of exercise are you interested in?";
            }
            break;
            
        case 'teacher':
            if (lowercaseMessage.includes('lesson plan') || lowercaseMessage.includes('curriculum')) {
                return "Effective lesson planning starts with clear learning objectives. Consider using the backward design approach: determine desired outcomes first, then plan assessments, and finally design learning activities. What subject and grade level are you teaching?";
            } else if (lowercaseMessage.includes('student engagement') || lowercaseMessage.includes('motivation')) {
                return "Increasing student engagement often involves making learning relevant to students' lives, incorporating active learning strategies, providing choice, and creating a positive classroom environment. What specific challenges are you facing with student engagement?";
            } else if (lowercaseMessage.includes('assessment') || lowercaseMessage.includes('evaluation')) {
                return "Balanced assessment includes both formative (ongoing) and summative (final) approaches. Consider using a variety of methods such as quizzes, projects, discussions, and self-assessments to accommodate different learning styles. What type of assessment are you developing?";
            }
            break;
            
        case 'businessanalyst':
            if (lowercaseMessage.includes('market research') || lowercaseMessage.includes('competitor')) {
                return "Effective market research combines quantitative data (surveys, market size) with qualitative insights (customer interviews, focus groups). SWOT and PESTEL analyses can help structure your competitive analysis. What specific market are you analyzing?";
            } else if (lowercaseMessage.includes('process') || lowercaseMessage.includes('workflow')) {
                return "Process optimization starts with mapping the current workflow to identify bottlenecks and inefficiencies. Consider using techniques like process mapping, value stream analysis, or SIPOC diagrams. What specific process are you looking to improve?";
            } else if (lowercaseMessage.includes('requirement') || lowercaseMessage.includes('stakeholder')) {
                return "Gathering requirements effectively involves engaging with all stakeholders, using techniques like interviews, workshops, and observation. Document requirements clearly using user stories, use cases, or requirement specifications. How many stakeholders are involved in your project?";
            }
            break;
            
        case 'writer':
            if (lowercaseMessage.includes('blog') || lowercaseMessage.includes('article')) {
                return "Effective blog posts typically have attention-grabbing headlines, valuable content, scannable formatting with subheadings and bullet points, and a clear call-to-action. What topic are you writing about?";
            } else if (lowercaseMessage.includes('story') || lowercaseMessage.includes('novel')) {
                return "Compelling stories often follow a structure like the three-act format or hero's journey. Focus on developing multidimensional characters, creating conflict, and showing rather than telling. What genre are you writing in?";
            } else if (lowercaseMessage.includes('edit') || lowercaseMessage.includes('revision')) {
                return "The editing process should address content, structure, clarity, and grammar in separate passes. Consider reading your work aloud or taking a break before editing to gain fresh perspective. Would you like specific editing tips for your type of writing?";
            }
            break;
            
        case 'lawyer':
            if (lowercaseMessage.includes('contract') || lowercaseMessage.includes('agreement')) {
                return "Contracts generally require offer, acceptance, consideration, and legal purpose to be valid. Clear language and defined terms are essential to avoid ambiguity. Remember that I can only provide general information, not legal advice. What aspects of contracts are you interested in learning about?";
            } else if (lowercaseMessage.includes('intellectual property') || lowercaseMessage.includes('copyright')) {
                return "Intellectual property protection comes in several forms: patents for inventions, copyrights for creative works, trademarks for brand identifiers, and trade secrets for confidential business information. Each has different registration requirements and protection periods. What type of intellectual property are you interested in?";
            } else if (lowercaseMessage.includes('business') || lowercaseMessage.includes('company')) {
                return "Business legal structures include sole proprietorships, partnerships, LLCs, and corporations, each with different liability protections and tax implications. Compliance requirements vary by industry and jurisdiction. What specific aspect of business law are you curious about?";
            }
            break;
    }
    
    // Default responses if no specific match
    const genericResponses = [
        `As a ${role.name}, I'd approach this by first understanding the context better. Could you provide more details about your specific situation?`,
        `That's an interesting question. In the field of ${role.name.toLowerCase()}, we would typically analyze this from multiple perspectives. What specific aspect are you most concerned with?`,
        `From a ${role.name.toLowerCase()} standpoint, there are several factors to consider here. Let's break down your question step by step. What's your main goal?`,
        `I'd be happy to help with that. Could you elaborate a bit more on what you're trying to achieve?`,
        `That's a great question. To give you the most helpful answer, could you share a bit more context about your specific situation?`
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}