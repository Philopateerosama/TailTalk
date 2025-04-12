// Sample chat data for each contact
const chatData = {
    Alice: [
        { sender: "Alice", message: "Hi there!" },
        { sender: "You", message: "Hello !" },
    ],
    Bob: [
        { sender: "Bob", message: "Hey, how are you?" },
        { sender: "You", message: "I'm good, thanks!" },
    ],
    Charlie: [
        { sender: "Charlie", message: "What's up?" },
    ],
    Diana: [],
    Eve: [],
};

let currentContact = "Alice";

// Function to load chat messages for the selected contact
function loadChat(contact) {
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = ""; // Clear previous messages

    chatData[contact].forEach((msg) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(msg.sender === "You" ? "sent" : "received");
        messageElement.textContent = msg.message;
        chatMessages.appendChild(messageElement);
    });

    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to handle contact selection
function selectContact(contact) {
    currentContact = contact;
    document.getElementById("chatContactName").textContent = contact;
    loadChat(contact);

    // Update active state in the sidebar
    document.querySelectorAll("#contactList li").forEach((li) => {
        li.classList.remove("active");
    });
    document.querySelector(#contactList li[data-contact="${contact}"]).classList.add("active");
}

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();

    if (message) {
        chatData[currentContact].push({ sender: "You", message });
        messageInput.value = ""; // Clear input field
        loadChat(currentContact); // Reload chat
    }
}

// Add event listeners to contact list items
document.querySelectorAll("#contactList li").forEach((li) => {
    li.addEventListener("click", () => {
        selectContact(li.getAttribute("data-contact"));
    });
});

// Load the initial chat (Alice)
loadChat(currentContact);
