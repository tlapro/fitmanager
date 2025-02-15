/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import chatbotFlow from "@/config/chatbox";
import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState("start");
  const [history, setHistory] = useState<{ text: string; sender: "bot" | "user" }[]>([
    { text: chatbotFlow.start?.question || "Error: No pregunta disponible", sender: "bot" },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const formatMessage = (message: string) => {
    return message.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const handleResponse = (option: string) => {
    const nextStep = chatbotFlow[currentStep]?.options?.[option];

    if (!nextStep) return;

    setHistory((prevHistory) => [
      ...prevHistory,
      { text: option, sender: "user" },
      {
        text: chatbotFlow[nextStep]?.question || formatMessage(chatbotFlow[nextStep]?.message || "Error: No mensaje disponible"),
        sender: "bot",
      },
    ]);

    setCurrentStep(nextStep);
  };

  const resetChat = () => {
    setCurrentStep("start");
    setHistory([{ text: chatbotFlow.start?.question || "Error: No pregunta disponible", sender: "bot" }]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  const isChatFinished = !chatbotFlow[currentStep]?.options;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 bg-black hover:bg-gray-950 text-white p-3 rounded-full shadow-lg"
        >
          <IoIosChatboxes size={20} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-5 right-3 w-3/12 h-[400px] p-5 bg-white text-black border border-gray-200 rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-center">ChatBot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3">
            {history.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md border ${
                  msg.sender === "bot" ? "bg-gray-200" : "bg-gray-400 text-white"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
          </div>

          {chatbotFlow[currentStep]?.options && (
            <div className="mt-4 space-y-2">
              {Object.keys(chatbotFlow[currentStep]?.options!).map((option) => (
                <button
                  key={option}
                  onClick={() => handleResponse(option)}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md text-sm"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {isChatFinished && (
            <button
              onClick={resetChat}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-md mt-4 text-sm"
            >
              Reiniciar Chatbot
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
