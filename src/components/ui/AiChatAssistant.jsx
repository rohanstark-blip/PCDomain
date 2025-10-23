import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Loader } from 'lucide-react';

export function AiChatAssistant({ build }) {
    const [messages, setMessages] = useState([
        { from: 'ai', text: "Hi there! How can I help you with your PC build today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    const callAI = async (prompt) => {
        setIsLoading(true);
        const apiKey = import.meta.env.VITE_ANANNAS_API_KEY || "sk-cr-f07b1930043840469540da0a31903dca";

        let buildContext = "The user is building a PC. Here are the components they've selected so far:\n";
        let hasComponents = false;
        for (const [key, value] of Object.entries(build)) {
            if (value) {
                hasComponents = true;
                buildContext += `- ${key.toUpperCase()}: ${value.name}\n`;
            }
        }
        if (!hasComponents) {
            buildContext = "The user has not selected any PC components yet.\n";
        }

        try {
            const response = await fetch("https://api.anannas.ai/v1/chat/completions", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "grok/grok-4-fast-non-reasoning",
                    messages: [
                        {
                            role: "system",
                            content: "You are a friendly and knowledgeable PC building expert. Your goal is to help users make informed decisions about their PC parts. Be concise and helpful. Don't mention you are an AI."
                        },
                        {
                            role: "user",
                            content: `${buildContext}\n\nUser's question: "${prompt}"`
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            const text = result.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
            setMessages(prev => [...prev, { from: 'ai', text }]);
        } catch (error) {
            console.error("AI API call error:", error);
            setMessages(prev => [...prev, { from: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '' || isLoading) return;
        
        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        callAI(input);
        setInput('');
    };

    return (
        <div className="glassmorphic rounded-xl shadow-2xl flex flex-col h-[30rem]">
            <h3 className="text-xl font-bold p-4 border-b border-cyan-400/20 text-cyan-300 flex items-center"><Bot className="w-5 h-5 mr-2"/> AI Assistant</h3>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-2.5 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                        {msg.from === 'ai' && <Bot className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />}
                        <div className={`p-3 rounded-xl max-w-xs md:max-w-md ${msg.from === 'user' ? 'bg-cyan-600 rounded-br-none' : 'bg-gray-800 rounded-bl-none'}`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                         {msg.from === 'user' && <User className="w-6 h-6 text-gray-300 flex-shrink-0 mt-1" />}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-2.5">
                        <Bot className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                        <div className="p-3 rounded-xl max-w-xs md:max-w-md bg-gray-800 rounded-bl-none">
                           <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-0"></span>
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></span>
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></span>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-cyan-400/20">
                <div className="flex items-center bg-gray-800 rounded-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about your build..."
                        className="w-full bg-transparent p-3 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button type="submit" className="p-3 text-cyan-400 hover:text-cyan-300 disabled:text-gray-500" disabled={isLoading}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0-0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="m22 2-11 11"/></svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

