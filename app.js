// ==========================================
// 1. DATA LAYER (Formerly databaseService.js)
// ==========================================
const databaseService = {
    async saveData(payload) {
        // Simulating a network request delay (1 second)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mocking a successful database write response.
        // (You would replace this simulation block with Firebase/AWS/API fetch calls)
        const success = true; 
        
        if (!success) {
            throw new Error("Network connection dropped.");
        }
        
        return {
            status: 200,
            id: "db_res_" + Math.random().toString(36).substr(2, 9),
            savedData: payload
        };
    }
};

// ==========================================
// 2. CONTROLLER LAYER (Formerly app.js)
// ==========================================

// DOM Elements
const submitBtn = document.getElementById('submitBtn');
const userInput = document.getElementById('userInput');
const statusMessage = document.getElementById('statusMessage');

// Event Listener
submitBtn.addEventListener('click', async () => {
    const dataToSave = userInput.value.trim();
    
    if (!dataToSave) {
        updateStatus("Please enter some text first!", "#f43f5e");
        return;
    }
    
    // Give immediate user feedback and disable double-clicking
    updateStatus("Processing request...", "#94a3b8");
    submitBtn.disabled = true;

    try {
        // Send data through our abstracted data layer object above
        const response = await databaseService.saveData({ text: dataToSave });
        
        // Handle success response
        updateStatus(`Saved! Log ID: ${response.id}`, "#34d399");
        userInput.value = ''; // clear input field
    } catch (error) {
        // Handle errors gracefully
        updateStatus(`Failed: ${error.message}`, "#f43f5e");
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
    }
});

// Helper function to update status UI colors and text
function updateStatus(text, color) {
    statusMessage.textContent = text;
    statusMessage.style.color = color;
}