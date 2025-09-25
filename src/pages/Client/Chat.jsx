// src/pages/Client/Chat.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientChat() {
  const [messages, setMessages] = useState([
    { sender: "Lawyer", text: "Hello, how can I assist you today?" },
    { sender: "Client", text: "I want to know the status of my case." },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, { sender: "Client", text: newMessage }]);
    setNewMessage("");

    // Mock auto-reply from lawyer
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "Lawyer", text: "Got it! I will update you soon." },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-800 rounded-xl shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Chat with Lawyer</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.sender === "Client" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-xl max-w-xs ${
                msg.sender === "Client"
                  ? "bg-blue-600 self-end text-white"
                  : "bg-gray-700 self-start text-gray-200"
              }`}
            >
              <p>{msg.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-lg bg-gray-700 outline-none"
        />
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold">
          Send
        </button>
      </form>
    </div>
  );
}
