import React, { useState, useRef, useEffect } from 'react';
import { useSessionStore } from '@/store/useSessionStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Send, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/utils/cn';

interface ChatPanelProps {
  onClose: () => void;
}

export const ChatPanel = ({ onClose }: ChatPanelProps) => {
  const { chatMessages, addChatMessage } = useSessionStore();
  const { user } = useAuthStore();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    
    addChatMessage(newMessage, user.id, user.name);
    setNewMessage('');
  };

  return (
    <div className="flex h-full w-80 flex-col border-l border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
        <h3 className="font-semibold">In-call Messages</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => {
          const isMe = msg.senderId === user?.id;
          return (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col space-y-1",
                isMe ? "items-end" : "items-start"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">{msg.senderName}</span>
                <span className="text-[10px] text-slate-400">{format(msg.timestamp, 'h:mm a')}</span>
              </div>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
                  isMe
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 rounded-tl-none"
                )}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="border-t border-slate-200 p-4 dark:border-slate-800">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
