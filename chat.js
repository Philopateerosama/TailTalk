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

function loadChat(contact) {
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = "";
    chatData[contact].forEach((msg) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(msg.sender === "You" ? "sent" : "received");
        messageElement.textContent = msg.message;
        chatMessages.appendChild(messageElement);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function selectContact(contact) {
    currentContact = contact;
    document.getElementById("chatContactName").textContent = contact;
    loadChat(contact);

    document.querySelectorAll("#contactList li").forEach((li) => {
        li.classList.remove("active");
    });
    document.querySelector(#contactList li[data-contact="${contact}"]).classList.add("active");
}

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();

    if (message) {
        chatData[currentContact].push({ sender: "You", message });
        messageInput.value = "";
        loadChat(currentContact); 
    }
}

document.querySelectorAll("#contactList li").forEach((li) => {
    li.addEventListener("click", () => {
        selectContact(li.getAttribute("data-contact"));
    });
});

loadChat(currentContact);
<<<<<<< HEAD
=======
function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();
    if (message !== "") {
      const chatBox = document.getElementById("chatMessages");
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      chatBox.appendChild(messageElement);
      input.value = "";
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
  
  function showAddContactForm() {
    alert("هنا هتضيف الفورم اللي بيطلب الاسم ورقم التليفون 🚀");
  }
  
