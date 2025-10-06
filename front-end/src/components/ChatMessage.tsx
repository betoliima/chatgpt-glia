import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div
      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm md:text-base whitespace-pre-wrap break-words animate-slide-up ${
        isUser
          ? 'ml-auto bg-primary text-primary-foreground'
          : 'mr-auto bg-card border border-border'
      }`}
    >
      {message}
    </div>
  );
};

export default ChatMessage;
