import { useState, useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FiPhone, FiMoreVertical, FiX, FiSearch, FiArrowLeft, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Card } from "../../ui/card";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ChatBox = ({ currentUser, chatUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("questions");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedChatUser, setChatUser] = useState(chatUser);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([
    {
      id: 1,
      name: "John Doe",
      profileImage: "/frontend/src/assets/profile.jpg",
      lastMessage: "Hey, is this still available?",
      time: "10:30 AM",
      status: "Unread"
    },
    {
      id: 2,
      name: "Sarah Smith",
      profileImage: "/frontend/src/assets/profile.jpg",
      lastMessage: "I'd like to offer ₹4,500",
      time: "Yesterday",
      status: "All"
    },
    {
      id: 3,
      name: "Mike Johnson",
      profileImage: "/frontend/src/assets/profile.jpg",
      lastMessage: "Where can we meet?",
      time: "2 days ago",
      status: "Meeting"
    },
    {
      id: 4,
      name: "Emily Wilson",
      profileImage: "/frontend/src/assets/profile.jpg",
      lastMessage: "Thanks for the information!",
      time: "3 days ago",
      status: "All"
    },
    {
      id: 5,
      name: "David Brown",
      profileImage: "/frontend/src/assets/profile.jpg",
      lastMessage: "Is the price negotiable?",
      time: "1 week ago",
      status: "Important"
    }
  ]);

  // Define an array of questions
  const commonQuestions = [
    "Is it still available?",
    "Let's meet up?",
    "What is the location?",
    "Can you share pictures?",
    "What's the condition?",
    "Any warranty left?",
    "Why are you selling?",
    "Is price negotiable?",
    "How old is it?",
    "Any damages?",
    "Original bill available?",
    "Can you deliver?",
    "What are the specifications?",
    "When can we meet?",
    "Is it pet-friendly?",
    "What's included?",
    "Any modifications?",
    "Last service date?",
    "Can I test before buying?",
    "Do you accept EMI?"
  ];

  const offerPrices = [
    "₹5,00,000",
    "₹4,50,000", 
    "₹4,00,000",
    "₹3,50,000",
    "₹3,00,000",
    "₹2,50,000"
  ];

  // Define your handler functions here, at the component level
  const handleBlockUser = async () => {
    if (!selectedChatUser) return;
    
    try {
      // In a real implementation, you would call your API to block the user
      alert(`User ${selectedChatUser.name} has been blocked`);
      
      // Remove this chat from the chat list
      setChatList(prevChatList => 
        prevChatList.filter(chat => chat.id !== selectedChatUser.id)
      );
      
      // Reset selected chat user if it was the blocked user
      if (selectedChatUser.id === selectedChatUser.id) {
        setChatUser(chatList[0] || null);
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      alert("Failed to block user. Please try again.");
    }
  };

  const handleDeleteChat = async () => {
    if (!selectedChatUser) return;
    
    try {
      // In a real implementation, you would call your API to delete the chat
      alert(`Chat with ${selectedChatUser.name} has been deleted`);
      
      // Remove this chat from the chat list
      setChatList(prevChatList => 
        prevChatList.filter(chat => chat.id !== selectedChatUser.id)
      );
      
      // Reset selected chat user if it was the deleted chat
      if (selectedChatUser.id === selectedChatUser.id) {
        setChatUser(chatList[0] || null);
      }
      
      // Clear messages
      setMessages([]);
    } catch (error) {
      console.error("Error deleting chat:", error);
      alert("Failed to delete chat. Please try again.");
    }
  };

  const handleSafetyTips = () => {
    // Display safety tips in a modal or alert
    alert(
      "Safety Tips:\n\n" +
      "1. Meet in public places\n" +
      "2. Don't share personal financial information\n" +
      "3. Inspect items before payment\n" +
      "4. Use secure payment methods\n" +
      "5. Trust your instincts - if something feels wrong, walk away"
    );
  };

  // Replace the entire handleSendMessage function with this corrected version
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    
    // Create user message object
    const userMsg = {
      text: newMessage,
      sender: currentUser,
      timestamp: new Date()
    };
    
    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, userMsg]);
    
    try {
      // Call the backend API to send the message and get response
      const response = await fetch('/api/chats/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: currentUser.id,
          receiverId: selectedChatUser.id,
          productId: selectedChatUser.productId || '123456789012', // Fallback ID if not available
          message: newMessage
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Add the automated response from the backend
        const automatedResponse = {
          text: data.response,
          sender: selectedChatUser,
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, automatedResponse]);
      } else {
        console.error('Error sending message:', data.error);
        
        // Fallback response if API call fails
        const fallbackResponse = {
          text: "Thanks for your message! I'll get back to you soon.",
          sender: selectedChatUser,
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, fallbackResponse]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback response if API call fails
      const fallbackResponse = {
        text: "Thanks for your message! I'll get back to you soon.",
        sender: selectedChatUser,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, fallbackResponse]);
    }
    
    // Clear input after sending
    setNewMessage("");
  };

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await fetch(`/api/chats/conversations/${currentUser.id}`);
        const data = await response.json();
        setChatList(data);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };
    
    fetchChatList();
  }, [currentUser]);
  
  const toggleQuickActions = () => {
    setIsQuickActionsOpen(!isQuickActionsOpen);
  };

  // Add this function to your component
  const insertQuestion = (question) => {
    setNewMessage(question);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* 🔹 Navbar */}
      <div className="w-full bg-white flex items-center p-4 shadow-md rounded-lg mb-4">
        <FiArrowLeft className="text-xl cursor-pointer" onClick={() => navigate("/main")} />
        <h2 className="text-lg font-semibold mx-auto">Chat</h2>
      </div>

      {/* 🔹 Chat Card */}
      <Card className="w-full h-full bg-white shadow-lg rounded-lg flex">
        {/* Left Panel */}
        <div className="w-1/3 border-r bg-gray-100 p-3 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">INBOX</h2>
            <div className="flex items-center gap-3">
              <FiSearch className="text-xl cursor-pointer" />
              <FiMoreVertical className="text-xl cursor-pointer" />
            </div>
          </div>

          {/* 🔹 Quick Filters */}
          <h3 className="text-gray-500 text-sm mb-2">Quick Filters</h3>
          <div className="flex gap-2 mb-3">
            {["All", "Meeting", "Unread", "Important"].map((filter) => (
              <Button
                key={filter}
                className={`px-3 py-1 rounded-full ${selectedFilter === filter ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* 🔹 Chat List */}
          <ScrollArea className="flex-1 overflow-auto">
            {chatList
              .filter((chat) => selectedFilter === "All" || chat.status === selectedFilter)
              .map((chat, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-200 ${
                    selectedChatUser && selectedChatUser.id === chat.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setChatUser(chat)}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={chat.profileImage || "/frontend/src/assets/profile.jpg"} 
                      alt={chat.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold">{chat.name}</h2>
                      <p className="text-gray-500 text-sm truncate w-40">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-gray-400">{chat.time}</p>
                    {chat.status === "Unread" && (
                      <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">
                        1
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </ScrollArea>
        </div>

        {/* Right Panel - Chat Box */}
        <div className="flex flex-col w-2/3 h-full bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <img
                src={selectedChatUser?.profileImage || "/default-profile.jpg"}
                alt={selectedChatUser?.name || "User"}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{selectedChatUser?.name || "John Doe"}</h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-xl cursor-pointer" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FiMoreVertical className="text-xl cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-md p-2">
                  <DropdownMenuItem onSelect={handleSafetyTips} className="cursor-pointer hover:bg-gray-100 p-2 rounded">
                    Safety Tips
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleBlockUser} className="cursor-pointer hover:bg-gray-100 p-2 rounded text-red-500">
                    Block User
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleDeleteChat} className="cursor-pointer hover:bg-gray-100 p-2 rounded text-red-500">
                    Delete Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <FiX className="text-xl cursor-pointer" />
            </div>
          </div>

          {/* Chat Section */}
          <div className="p-3 flex-1 flex flex-col">
            <p className="text-center text-gray-500 text-sm">Today</p>
            <ScrollArea className="flex-1 h-80 border rounded-lg p-3 overflow-auto bg-gray-50">
              <div className="flex flex-col space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex w-full my-1 ${
                      msg.sender === currentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[70%] font-medium shadow-md ${
                        msg.sender === currentUser
                          ? "bg-blue-500 text-white self-end"
                          : "bg-gray-300 text-black self-start"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

          {/* Input Field */}
          <div className="flex items-center mt-3 gap-2">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow border p-2 rounded-md"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Send
            </Button>
          </div>
        </div>

        {/* Collapsible Quick Actions Section */}
        <div className="border-t">
          <div 
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
            onClick={toggleQuickActions}
          >
            <h3 className="font-semibold text-gray-700">Quick Actions</h3>
            {isQuickActionsOpen ? (
              <FiChevronUp className="text-xl" />
            ) : (
              <FiChevronDown className="text-xl" />
            )}
          </div>
          
          {isQuickActionsOpen && (
            <div className="p-3 border-t">
              {/* Tabs for Questions and Offer */}
              <div className="flex justify-around mb-3">
                <button
                  className={`p-2 flex-1 font-semibold ${
                    activeTab === "questions" ? "border-b-2 border-black" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("questions")}
                >
                  QUESTIONS
                </button>
                <button
                  className={`p-2 flex-1 font-semibold ${
                    activeTab === "offer" ? "border-b-2 border-black" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("offer")}
                >
                  MAKE OFFER
                </button>
              </div>

              {activeTab === "questions" && (
  <div className="p-2">
    <ScrollArea className="h-40 overflow-auto">
      <div className="grid grid-cols-3 gap-2">
        {commonQuestions.map((question, index) => (
          <Button 
            key={index}
            className="bg-gray-200 text-xs py-1 px-2 h-auto" 
            onClick={() => insertQuestion(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </ScrollArea>
  </div>
)}

{activeTab === "offer" && (
  <div className="p-2">
    <ScrollArea className="h-40 overflow-auto">
      <div className="grid grid-cols-3 gap-2">
        {offerPrices.map((price, index) => (
          <Button 
            key={index}
            className="bg-gray-200 text-xs py-1 px-2 h-auto" 
            onClick={() => setNewMessage(`I'd like to offer ${price}`)}
          >
            {price}
          </Button>
        ))}
      </div>
    </ScrollArea>
  </div>
)}
            </div>
          )}
        </div>
      </div>
      </Card>
    </div>
  );
};

ChatBox.propTypes = {
  currentUser: PropTypes.object.isRequired,
  chatUser: PropTypes.object.isRequired,
};

export default ChatBox;
