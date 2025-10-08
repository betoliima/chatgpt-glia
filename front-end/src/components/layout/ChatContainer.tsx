import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from '../ui/ChatMessage';
import ChatInput from '../ui/ChatInput';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);

    // Simular resposta da GLIA após 1 segundo
    setTimeout(() => {
      const gliaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Olá! Recebi sua mensagem: "${messageText}". Como posso ajudar você hoje?`,
        isUser: false,
      };
      setMessages(prev => [...prev, gliaMessage]);
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl animate-fade-in" style={{ animationDelay: '0.8s' }}>
      {messages.length > 0 && (
        <div className="mb-4 max-h-[400px] overflow-y-auto rounded-3xl bg-card/30 backdrop-blur-sm border border-border p-6">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Barra de entrada na posição natural (sem fixo) */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
