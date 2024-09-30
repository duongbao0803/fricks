"use client";

import React, { useState, useEffect } from "react";
import { MdKeyboardVoice } from "react-icons/md";

const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

const VoiceSearch = ({ onSearch }: { onSearch: any }) => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    // Cấu hình nhận dạng giọng nói
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "vi-VN";

    // Xử lý kết quả từ giọng nói
    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setSearchQuery(finalTranscript);
      onSearch(finalTranscript); // Gọi hàm callback để lưu kết quả
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, onSearch]);

  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  return (
    <MdKeyboardVoice
      className="absolute right-3 z-[999] cursor-pointer select-none text-gray-400 transition-all duration-500"
      onClick={toggleListening}
    />
  );
};

export default VoiceSearch;
