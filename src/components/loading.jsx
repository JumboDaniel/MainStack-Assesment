import React, { useState, useEffect } from "react";
import { MainStackLogo } from "./svg";

const Loading = () => {
  return (
    <div class="h-[100vh] font-bold flex flex-col justify-center items-center gap-6">
      <MainStackLogo />
      <Typewriter text="MainStack Dashboard" />
      <p>Loading <Countdown/></p>
    </div>
  );
};

export default Loading;


const Typewriter = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(interval);
        }
      }, 100);
  
      return () => clearInterval(interval);
    }, [currentIndex, text]);
  
    return <span className="text-4xl font-bold">{displayedText}</span>;
  };
  
  function Countdown() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const timer =
        count > 0 && setInterval(() => setCount(count + 1), 500);
      return () => clearInterval(timer);
    }, [count]);
  
    return <div>{count}</div>;
  }
  
  