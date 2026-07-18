const chat = document.getElementById("chat");
const input = document.getElementById("message");
const button = document.getElementById("send");

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = sender;

    div.innerText = text;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");

    input.value = "";

    const loading = document.createElement("div");
    loading.className = "bot";
    loading.innerText = "MADARA IA est en train d'écrire...";

    chat.appendChild(loading);

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        loading.remove();

        addMessage(data.reply || "Aucune réponse.", "bot");

    } catch (e) {

        loading.remove();

        addMessage("Erreur de connexion au serveur.", "bot");

    }

}

button.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        sendMessage();

    }

});