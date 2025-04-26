import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatBot from "./ChatBot";

const FloatingIcon = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5">
      {open ? (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-between items-center bg-blue-500 p-3">
            <h3 className="text-white font-bold">DEL AI</h3>
          </div>
          <ChatBot />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 p-4 rounded-full shadow-lg"
        >
          <MessageCircle className="text-white w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default FloatingIcon;
