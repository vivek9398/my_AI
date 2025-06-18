// Simple test script to verify that the role selection works correctly
console.log('Testing role selection functionality');

// Function to test if the role selection works
function testRoleSelection() {
  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, testing role selection');
    
    // Wait a bit to ensure all scripts are loaded
    setTimeout(() => {
      // Get all role cards
      const roleCards = document.querySelectorAll('.role-card');
      console.log(`Found ${roleCards.length} role cards`);
      
      // Add a click event to the first role card
      if (roleCards.length > 0) {
        console.log('Clicking the first role card');
        roleCards[0].click();
        
        // Check if the chat container is displayed
        setTimeout(() => {
          const chatContainer = document.getElementById('chatContainer');
          if (chatContainer && chatContainer.style.display === 'flex') {
            console.log('SUCCESS: Chat container is displayed');
          } else {
            console.error('ERROR: Chat container is not displayed');
          }
          
          // Test the back button
          const backButton = document.getElementById('backButton');
          if (backButton) {
            console.log('Clicking the back button');
            backButton.click();
            
            // Check if the role grid is displayed again
            setTimeout(() => {
              const roleSelectionWrapper = document.querySelector('.role-selection-wrapper');
              if (roleSelectionWrapper && roleSelectionWrapper.style.display === 'block') {
                console.log('SUCCESS: Role selection wrapper is displayed');
              } else {
                console.error('ERROR: Role selection wrapper is not displayed');
              }
            }, 500);
          }
        }, 500);
      }
    }, 1000);
  });
}

// Run the test
testRoleSelection();