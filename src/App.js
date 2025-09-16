import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [message, setMessage] = useState("Hello");
  const [reply, setReply] = useState("");
  const [usedIds, setUsedIds] = useState([]);

  // // Load used IDs from localStorage on mount
  // useEffect(() => {
  //   const stored = localStorage.getItem("usedChunkIds");
  //   if (stored) setUsedIds(JSON.parse(stored));
  // }, []);

  // // Save used IDs to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("usedChunkIds", JSON.stringify(usedIds));
  // }, [usedIds]);

  async function sendMessage() {
    try {
      const res = await fetch("https://k-smith-bot-be.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, usedChunkIds: usedIds }),
      });
      const data = await res.json();

      // Backend returns new IDs used in this response
      if (data.newUsedIds) {
        setUsedIds(prev => [...prev, ...data.newUsedIds]);
      }

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
