import { useState } from "react";
import './App.css';

function App() {
  const [message, setMessage] = useState("Hello");
  const [reply, setReply] = useState("");

  async function sendMessage() {
    try {
      const res = await fetch("https://k-smith-bot-be.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      setReply("Error: " + err.message);
    }
  }

  return (
    <div>
      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <pre>{reply}</pre>
    </div>
  );
}

export default App;
