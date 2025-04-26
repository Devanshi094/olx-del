import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { Paperclip, ThumbsUp, Smile } from "lucide-react";

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hi there, I'm DEL AI! 😊 How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

   // Send User Message and Get AI Response
   const sendMessage = async () => {
    if (input.trim() === "") return;
  
    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { text: "❌ Error getting response", sender: "bot" }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "⚠️ Failed to connect to server", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/chatbot/history");
        const data = await response.json();
        if (response.ok) {
          // Add chat history but keep the initial bot message
          setMessages([
            { text: "Hi there, I'm DEL AI! 😊 How can I assist you?", sender: "bot" }, // Initial bot message
            ...data.flatMap(chat => [
              { text: chat.userMessage, sender: "user" },
              { text: chat.botResponse, sender: "bot" }
            ])
          ]);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChatHistory();
  }, []);
  

  
  return (
    <div
      className="fixed bottom-5 right-5 w-[400px] h-[500px] bg-white shadow-lg rounded-lg flex flex-col border border-gray-300"
    >
      {/* Chat Header */}
      <div className="flex justify-between items-center bg-[#388691] p-3 rounded-t-lg">
        <h3 className="text-white text-lg font-bold">DEL AI</h3>
        <button onClick={onClose} className="text-white font-bold text-xl">
          X
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-100 space-y-3">
  {messages.map((msg, index) => (
    <div key={index} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
      <div
        className={`p-3 max-w-[75%] rounded-xl ${
          msg.sender === "bot"
            ? "bg-gray-300 text-black"  // Bot messages on the left
            : "bg-blue-500 text-white"  // User messages on the right
        }`}
      >
        {msg.text}
      </div>
    </div>
  ))}
  {loading && (
    <div className="flex justify-start">
      <div className="p-3 max-w-[75%] bg-gray-300 text-black rounded-xl">
        Typing...
      </div>
    </div>
  )}
</div>



      {/* Input and Icons */}
      <div className="p-3 bg-white border-t flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-lg outline-none"
          placeholder="Type here and press enter..."
        />
        <button className="text-gray-500 hover:text-[#388691]">
          <Paperclip className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-[#388691]">
          <ThumbsUp className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-[#388691]">
          <Smile className="w-5 h-5" />
        </button>
        <button
          onClick={sendMessage}
          className="ml-2 bg-[#388691] text-white px-4 py-2 rounded-lg hover:bg-[#2e6c73]"
        >
          Send
        </button>
      </div>
    </div>
  );
};

// ✅ Add PropTypes Validation
ChatBot.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChatBot;
