import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircle, Search, Send, MoreVertical, Phone, Video, User, Star } from 'lucide-react';

const MessagesPage = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const chats = [
    {
      id: '1',
      name: 'Alex Blockman',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      lastMessage: 'Thanks for your feedback on my latest chapter!',
      timestamp: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: '2',
      name: 'Maya Satoshi',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      lastMessage: 'Would love to collaborate on a story',
      timestamp: '1h ago',
      unread: 0,
      online: false
    },
    {
      id: '3',
      name: 'Writing Club',
      avatar: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
      lastMessage: 'Next meeting this Friday!',
      timestamp: '3h ago',
      unread: 5,
      online: true,
      isGroup: true
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: '1',
      text: 'Hey! I just read your latest chapter of The Ethereum Chronicles. The plot twist was amazing!',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      senderId: user?.address,
      text: 'Thank you so much! I spent a lot of time crafting that reveal. Any specific parts that stood out to you?',
      timestamp: '10:32 AM'
    },
    {
      id: '3',
      senderId: '1',
      text: 'The way you connected the anomaly to the Genesis Protocol was brilliant. Didn\'t see it coming!',
      timestamp: '10:33 AM'
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex">
      {/* Chat List */}
      <div className="w-80 border-r border-[var(--border-color)] bg-white dark:bg-gray-900">
        <div className="p-4 border-b border-[var(--border-color)]">
          <h1 className="text-xl font-semibold mb-4">Messages</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="input pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selectedChat === chat.id ? 'bg-primary-50 dark:bg-primary-900/30' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate">{chat.name}</h3>
                  <span className="text-xs text-[var(--text-secondary)]">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] truncate">
                  {chat.lastMessage}
                </p>
              </div>
              
              {chat.unread > 0 && (
                <span className="flex-shrink-0 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {chat.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900/50">
          {/* Chat Header */}
          <div className="p-4 bg-white dark:bg-gray-900 border-b border-[var(--border-color)] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={chats.find(c => c.id === selectedChat)?.avatar}
                alt="Chat avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-medium">
                  {chats.find(c => c.id === selectedChat)?.name}
                </h2>
                <p className="text-sm text-success-600 dark:text-success-400">Online</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Phone className="h-5 w-5 text-[var(--text-secondary)]" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Video className="h-5 w-5 text-[var(--text-secondary)]" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <User className="h-5 w-5 text-[var(--text-secondary)]" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <MoreVertical className="h-5 w-5 text-[var(--text-secondary)]" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === user?.address ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${
                  message.senderId === user?.address
                    ? 'bg-primary-600 text-white rounded-l-lg rounded-tr-lg'
                    : 'bg-white dark:bg-gray-800 rounded-r-lg rounded-tl-lg'
                } p-3 shadow-sm`}>
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-900 border-t border-[var(--border-color)]">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="input flex-1"
              />
              <button
                type="submit"
                className="btn-primary p-2 rounded-full"
                disabled={!messageInput.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-[var(--text-secondary)] mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Select a conversation
            </h2>
            <p className="text-[var(--text-secondary)]">
              Choose a chat from the list to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;