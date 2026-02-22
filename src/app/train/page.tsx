"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { useVoiceTrainer } from "@/hooks/useVoiceTrainer";

export default function TrainPage() {
  const [level, setLevel] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  const {
    isRecording,
    messages,
    isProcessing,
    startRecording,
    stopRecording,
    setMessages
  } = useVoiceTrainer(level || "", topic || "");

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const topics = ["Job Interview", "Daily Conversation", "Debate", "Role-play"];

  const handleStart = () => {
    if (level && topic) {
      setIsStarted(true);
      setMessages([
        {
          role: "assistant",
          content: `Hello! I'm your AI English Trainer. I'm so excited to help you improve your speaking skills today! 😊 Let's start our ${level} level practice about ${topic}. How are you feeling today?`,
        },
      ]);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (!isStarted) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="flex justify-center mb-6">
             <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-3xl">L</span>
              </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">LinguaLift AI</h1>
          <p className="text-slate-500 text-center mb-8">Set up your personalized training session</p>
          
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Your English Level</label>
              <div className="grid grid-cols-3 gap-3">
                {levels.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`py-3 rounded-2xl font-bold transition-all border-2 ${
                      level === l 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/30" 
                        : "bg-white border-slate-100 text-slate-600 hover:border-primary/50"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Practice Topic</label>
              <div className="grid grid-cols-2 gap-3">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`py-3 px-4 rounded-2xl font-bold text-left transition-all border-2 ${
                      topic === t 
                        ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/30" 
                        : "bg-white border-slate-100 text-slate-600 hover:border-secondary/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={!level || !topic}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all transform hover:scale-[1.02] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Practice Session
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4 fixed w-full top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
            <span>← Exit</span>
          </Link>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-tighter">{level}</span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-tighter">{topic}</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <section className="flex-1 pt-24 pb-48 px-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((msg, i) => (
            <div key={i} className={`flex animate-in-up ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] relative ${
                msg.role === "user" 
                  ? "bg-primary text-white rounded-3xl rounded-tr-none p-5 shadow-xl shadow-primary/10" 
                  : "bg-white border border-slate-100 text-slate-800 rounded-3xl rounded-tl-none p-6 shadow-sm"
              }`}>
                {msg.role === "assistant" && msg.correction && (
                  <div className="mb-4 p-5 bg-amber-50/50 border border-amber-100 rounded-2xl text-slate-900 text-sm overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                    <div className="flex items-start gap-3 mb-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-[10px] font-bold">!</span>
                        <div>
                            <p className="font-bold text-amber-800 text-xs uppercase tracking-wider">Mistake detected</p>
                            <p className="italic text-slate-600 font-mono text-xs mt-1">"{msg.correction.original}"</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="font-bold text-green-700 text-xs uppercase tracking-wider">Better version</p>
                            <p className="font-medium text-slate-900 mt-1">{msg.correction.corrected}</p>
                        </div>
                        <div className="pt-2 border-t border-amber-100">
                             <p className="text-slate-600 leading-relaxed text-xs">{msg.correction.explanation}</p>
                        </div>
                        {msg.correction.pronunciation && (
                          <div className="pt-2 mt-2 border-t border-amber-100 flex items-center gap-2">
                             <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">Tip</span>
                             <p className="text-blue-700 text-[11px] font-medium leading-tight">{msg.correction.pronunciation}</p>
                          </div>
                        )}
                    </div>
                  </div>
                )}
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
               <div className="bg-white border border-slate-100 p-4 rounded-2xl flex gap-1 shadow-sm">
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Controller */}
      <footer className="fixed bottom-0 w-full p-8 flex justify-center">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <div className={`mb-4 px-6 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
              isRecording ? "bg-red-100 text-red-600 animate-pulse" : "bg-primary/10 text-primary"
          }`}>
            {isRecording ? "• LISTENING..." : "READY TO HEAR YOU"}
          </div>
          
          <button 
            onClick={toggleRecording}
            className={`group relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              isRecording 
                ? "bg-red-500 scale-110 shadow-[0_0_50px_-5px_theme(colors.red.500)]" 
                : "bg-primary hover:bg-primary-dark shadow-[0_0_40px_-5px_theme(colors.indigo.500)] hover:scale-105"
            }`}
          >
             <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform"></div>
            {isRecording ? (
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
              </svg>
            )}
          </button>
        </div>
      </footer>
    </main>
  );
}

