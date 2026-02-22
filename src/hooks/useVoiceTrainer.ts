"use client";

import { useState, useCallback, useRef, useEffect } from "react";

import { analyzeSpeech, Correction } from "@/services/CorrectionService";

interface Message {
  role: "user" | "assistant";
  content: string;
  correction?: Correction;
}

export const useVoiceTrainer = (level: string, topic: string) => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleUserSpeech(transcript);
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      }
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = (text: string) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // Friendly tone
      synthRef.current.speak(utterance);
    }
  };

  const handleUserSpeech = async (transcript: string) => {
    setIsProcessing(true);
    setMessages((prev) => [...prev, { role: "user", content: transcript }]);

    // Analyze speech using the service
    const correction = analyzeSpeech(transcript, level);
    
    // AI Thinking delay based on message length
    const thinkingTime = Math.min(Math.max(transcript.length * 20, 1000), 3000);
    
    setTimeout(() => {
      const aiResponse = generateAIResponse(transcript, level, topic);
      
      const newMessage: Message = {
        role: "assistant",
        content: aiResponse,
        correction: correction || undefined
      };

      setMessages((prev) => [...prev, newMessage]);
      speak(aiResponse);
      setIsProcessing(false);
    }, thinkingTime);
  };

  const generateAIResponse = (text: string, level: string, topic: string): string => {
    const input = text.toLowerCase();
    
    // Contextual responses based on keywords
    if (input.includes("hello") || input.includes("hi")) {
      return "Hi there! How can I help you with your English today?";
    }
    
    if (input.includes("job") || input.includes("interview")) {
      return "Job interviews can be nerve-wracking! Tell me about the position you're applying for, and let's practice.";
    }

    if (input.includes("thank") || input.includes("thanks")) {
      return "You're very welcome! Is there anything else you'd like to practice?";
    }

    if (input.includes("weather")) {
      return "Talking about the weather is a classic English conversation starter! How's the weather where you are?";
    }

    if (input.includes("difficult") || input.includes("hard")) {
      return "Don't worry, learning a language takes time. Let's take it slow. What part do you find most challenging?";
    }

    const genericResponses = [
      "That sounds wonderful! Can you tell me more about that?",
      "I see what you mean. What happened next?",
      "That's a great point. How do you feel about it?",
      "Interesting perspective! In your opinion, why is that?",
      "I understand. Let's explore that topic a bit deeper.",
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const startRecording = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error("Speech recognition error:", e);
      }
    } else {
      alert("Speech Recognition not supported in this browser.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  return {
    isRecording,
    messages,
    isProcessing,
    startRecording,
    stopRecording,
    setMessages
  };
};
