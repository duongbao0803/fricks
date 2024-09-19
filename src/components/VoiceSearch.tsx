"use client";

import React, { useState, useEffect } from "react";

// Kiểm tra xem trình duyệt có hỗ trợ SpeechRecognition không
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const VoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Cấu hình nhận dạng giọng nói
    recognition.continuous = true; // Để nhận dạng liên tục
    recognition.interimResults = true; // Nhận kết quả tạm thời (liên tục cập nhật)
    recognition.lang = "vi-VN"; // Thiết lập ngôn ngữ

    // Xử lý kết quả từ giọng nói
    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setSearchQuery(finalTranscript);
    };

    // Bắt lỗi nếu có
    recognition.onerror = (event) => {
      console.error(event.error);
    };

    // Khi kết thúc nhận dạng
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
  }, [isListening]);

  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Voice Search</h1>
      <button onClick={toggleListening}>
        {isListening ? "Dừng Nghe" : "Bắt đầu tìm kiếm"}
      </button>
      <p>Truy vấn tìm kiếm: {searchQuery}</p>
    </div>
  );
};

export default VoiceSearch;
