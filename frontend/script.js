const API_KEY = "AQ.Ab8RN6LMateAKfQMrLlIPMXE6830FziJWofBUFpu9Z54iS9_pw";

const chat = document.getElementById('chat');
const input = document.getElementById('messageInput') || document.querySelector('input');

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage('YOU: ' + text, 'user');
    input.value = '';

    addMessage('J.A.R.V.I.S: Processing...', 'ai');

    try {
        const res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "x-goog-api-key": API_KEY
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: text }] }]
                })
            }
        );

        const data = await res.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const reply = data.candidates[0].content.parts[0].text;
            updateLastAiMessage('J.A.R.V.I.S: ' + reply);
        } else {
            updateLastAiMessage('J.A.R.V.I.S: API error - ' + (data.error?.message || 'Unknown issue'));
        }
    } catch (e) {
        updateLastAiMessage('J.A.R.V.I.S: Network error - ' + e.message);
    }
}

function addMessage(msg, sender) {
    const p = document.createElement('p');
    p.innerText = msg;
    p.className = sender;
    chat.appendChild(p);
}

function updateLastAiMessage(msg) {
    const aiMessages = chat.getElementsByClassName('ai');
    if (aiMessages.length > 0) {
        aiMessages[aiMessages.length - 1].innerText = msg;
    }
}

document.getElementById('send').onclick = sendMessage;
