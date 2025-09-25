// src/pages/Lawyer/Chat.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LawyerChat() {
  const [messages, setMessages] = useState([
    { sender: "Client", text: "Hello, can you update me on my case?" },
    { sender: "Lawyer", text: "Sure, I am reviewing the documents now." },
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

    setMessages([...messages, { sender: "Lawyer", text: newMessage }]);
    setNewMessage("");

    // Mock auto-reply from client
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "Client", text: "Thanks! I appreciate your help." },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-800 rounded-xl shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Chat with Client</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 flex flex-col">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.sender === "Lawyer" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-xs px-4 py-2 rounded-2xl break-words ${
                msg.sender === "Lawyer"
                  ? "bg-green-600 text-white self-end rounded-br-none"
                  : "bg-gray-700 text-gray-200 self-start rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
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
          className="flex-1 p-3 rounded-lg bg-gray-700 outline-none text-white"
        />
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold">
          Send
        </button>
      </form>
    </div>
  );
}
