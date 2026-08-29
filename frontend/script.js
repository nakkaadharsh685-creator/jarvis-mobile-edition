const API_KEY = "AQ.Ab8RN6Jav-DAHM62wEwZN0UbXmLpUA4iQZANmaeAVQZamQh1EQ";

const chat = document.getElementById('chat');
const input = document.getElementById('msg');

document.getElementById('send').onclick = async () => {
    const t = input.value.trim();
    if (!t) return;
    
    add('YOU: ' + t, 'user');
    input.value = '';
    add('J.A.R.V.I.S: Processing...', 'ai');

    try {
        const res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=" + API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: t }] }] })
            }
        );
        const data = await res.json();
        
        if (data.candidates && data.candidates[0]) {
            const reply = data.candidates[0].content.parts[0].text;
            chat.lastChild.innerText = 'J.A.R.V.I.S: ' + reply;
        } else {
            chat.lastChild.innerText = 'J.A.R.V.I.S: API error occurred.';
        }
    } catch (e) {
        chat.lastChild.innerText = 'J.A.R.V.I.S: Connection error.';
    }
};

function add(text, who) {
    const d = document.createElement('div');
    d.className = 'msg ' + who;
    d.innerText = text;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
}
