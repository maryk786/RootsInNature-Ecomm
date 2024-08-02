import React, { useEffect, useState } from "react";
const words = [
  "Buy products of Rs 4000 or more and get 10% Discount 😍😍",
  "Get Free shipping over Rs 1000 or more 😁😁",
  "Free shipping only for plants! 🤩🤩",
];
const DiscountBar = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTyping) {
        if (currentCharacterIndex < words[currentWordIndex].length) {
          setCurrentCharacterIndex((prev) => prev + 1);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            setCurrentCharacterIndex(0);
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          }, 1000); // Adjust this delay according to your preference
        }
      }
    }, 50); // Typing speed, adjust as needed

    return () => clearTimeout(timer);
  }, [currentCharacterIndex, currentWordIndex, isTyping]);

  return (
    <div className="bg-red-600 text-white text-center p-1">
      <h1 className="text-sm overflow-hidden ">
        {words[currentWordIndex].substring(0, currentCharacterIndex)}
        {isTyping ? <span className="animate-typing">|</span> : null}
      </h1>
    </div>
  );
};

export default DiscountBar;
