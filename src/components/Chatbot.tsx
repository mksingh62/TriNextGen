import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
          MessageCircle,
          X,
          Send,
          Bot,
          User,
          Minimize2,
          Maximize2,
          Sparkles,
          Zap,
          Lightbulb,
          Code,
          Cloud,
          PhoneCall,
} from 'lucide-react';

interface Message {
          id: string;
          text: string;
          sender: 'user' | 'bot';
          timestamp: Date;
          type?: 'text' | 'suggestion' | 'action';
}

const Chatbot = () => {
          const [isOpen, setIsOpen] = useState(false);
          const [isMinimized, setIsMinimized] = useState(false);
          const [isDragging, setIsDragging] = useState(false);
          const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
          const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
          const [messages, setMessages] = useState<Message[]>([
                    {
                              id: '1',
                              text: "Hello! I'm TriNextGen's AI assistant. How can I help you today?",
                              sender: 'bot',
                              timestamp: new Date(),
                              type: 'text'
                    }
          ]);
          const [inputValue, setInputValue] = useState('');
          const [isTyping, setIsTyping] = useState(false);
          const messagesEndRef = useRef<HTMLDivElement>(null);
          const inputRef = useRef<HTMLInputElement>(null);
          const cardRef = useRef<HTMLDivElement>(null);

          const scrollToBottom = () => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          };

          useEffect(() => {
                    scrollToBottom();
          }, [messages]);

          useEffect(() => {
                    if (isOpen && inputRef.current) {
                              inputRef.current.focus();
                    }
          }, [isOpen]);

          // Initialize position to bottom-right when opened
          useEffect(() => {
                    if (isOpen) {
                              const width = cardRef.current?.offsetWidth ?? 384; // ~w-96
                              const height = (isMinimized ? 64 : 600) + 24; // card height + margin
                              const x = Math.max(12, window.innerWidth - width - 24);
                              const y = Math.max(12, window.innerHeight - height);
                              setPosition(({ x: prevX, y: prevY }) => ({
                                        x: prevX || x,
                                        y: prevY || y
                              }));
                    }
          }, [isOpen, isMinimized]);

          // Drag handlers
          const onMouseDownHeader = (e: React.MouseEvent) => {
                    if (!cardRef.current) return;
                    setIsDragging(true);
                    const rect = cardRef.current.getBoundingClientRect();
                    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                    e.preventDefault();
          };

          useEffect(() => {
                    const onMouseMove = (e: MouseEvent) => {
                              if (!isDragging) return;
                              const width = cardRef.current?.offsetWidth ?? 384;
                              const height = cardRef.current?.offsetHeight ?? (isMinimized ? 64 : 600);
                              const nextX = e.clientX - dragOffset.x;
                              const nextY = e.clientY - dragOffset.y;
                              // Clamp to viewport
                              const clampedX = Math.min(Math.max(8, nextX), window.innerWidth - width - 8);
                              const clampedY = Math.min(Math.max(8, nextY), window.innerHeight - height - 8);
                              setPosition({ x: clampedX, y: clampedY });
                    };
                    const onMouseUp = () => setIsDragging(false);
                    if (isDragging) {
                              window.addEventListener('mousemove', onMouseMove);
                              window.addEventListener('mouseup', onMouseUp);
                    }
                    return () => {
                              window.removeEventListener('mousemove', onMouseMove);
                              window.removeEventListener('mouseup', onMouseUp);
                    };
          }, [isDragging, dragOffset.x, dragOffset.y, isMinimized]);

          const quickActions = [
                    { icon: Code, text: 'Web Development', color: 'bg-blue-500' },
                    { icon: Cloud, text: 'Cloud Solutions', color: 'bg-green-500' },
                    { icon: Zap, text: 'Mobile Apps', color: 'bg-purple-500' },
                    { icon: Lightbulb, text: 'Consultation', color: 'bg-yellow-500' }
          ];

          const botResponses = [
                    "That's a great question! Let me help you with that.",
                    "I understand you're looking for software solutions. TriNextGen specializes in...",
                    "Based on your requirements, I'd recommend our...",
                    "Let me connect you with our technical team for a detailed discussion.",
                    "We have extensive experience in that area. Here's what we can offer...",
                    "That sounds like an exciting project! Our team would love to help.",
                    "I can provide you with more information about our services.",
                    "Let me share some relevant case studies with you."
          ];

          const handleSendMessage = async () => {
                    if (!inputValue.trim()) return;

                    const userMessage: Message = {
                              id: Date.now().toString(),
                              text: inputValue,
                              sender: 'user',
                              timestamp: new Date(),
                              type: 'text'
                    };

                    const currentInput = inputValue;
                    setMessages(prev => [...prev, userMessage]);
                    setInputValue('');
                    setIsTyping(true);

                    // try {
                    //           const response = await fetch('http://localhost:5000/chat-trinextgen', {
                    //                     method: 'POST',
                    //                     headers: {
                    //                               'Content-Type': 'application/json',
                    //                     },
                    //                     body: JSON.stringify({ message: currentInput }),
                    //           });

                    //           if (!response.ok) {
                    //                     throw new Error('Network response was not ok');
                    //           }

                    //           const data = await response.json();

                    //           const botResponse: Message = {
                    //                     id: (Date.now() + 1).toString(),
                    //                     text: data.response, // Assuming the API returns { response: "..." }
                    //                     sender: 'bot',
                    //                     timestamp: new Date(),
                    //                     type: 'text'
                    //           };
                    //           setMessages(prev => [...prev, botResponse]);
                    // } catch (error) {
                    //           console.error("Chatbot API error:", error);
                    //           const errorResponse: Message = {
                    //                     id: (Date.now() + 1).toString(),
                    //                     text: "I'm sorry, but I'm having trouble connecting. Please try again later.",
                    //                     sender: 'bot',
                    //                     timestamp: new Date(),
                    //                     type: 'text'
                    //           };
                    //           setMessages(prev => [...prev, errorResponse]);
                    // } finally {
                    //           setIsTyping(false);
                    // }

                    // try {
                    //     setIsTyping(true);

                    //     const response = await fetch('http://localhost:8080/predict', {
                    //         method: 'POST',
                    //         headers: { 'Content-Type': 'application/json' },
                    //         body: JSON.stringify({ text: currentInput }), // <--- corrected
                    //     });

                    //     if (!response.ok) throw new Error('Network response was not ok');

                    //     const data = await response.json();

                    //     const botResponse: Message = {
                    //         id: (Date.now() + 1).toString(),
                    //         text: data.response,
                    //         sender: 'bot',
                    //         timestamp: new Date(),
                    //         type: 'text'
                    //     };

                    //     setMessages(prev => [...prev, botResponse]);
                    //     } catch (error) {
                    //     console.error("Chatbot API error:", error);
                    //     const errorResponse: Message = {
                    //         id: (Date.now() + 1).toString(),
                    //         text: "I'm sorry, but I'm having trouble connecting. Please try again later.",
                    //         sender: 'bot',
                    //         timestamp: new Date(),
                    //         type: 'text'
                    //     };
                    //     setMessages(prev => [...prev, errorResponse]);
                    //     } finally {
                    //     setIsTyping(false);
                    //     }

          };

          const handleQuickAction = (action: string) => {
                    const actionMessage: Message = {
                              id: Date.now().toString(),
                              text: `I'm interested in ${action}`,
                              sender: 'user',
                              timestamp: new Date(),
                              type: 'action'
                    };
                    setMessages(prev => [...prev, actionMessage]);
                    setIsTyping(true);

                    setTimeout(() => {
                              const botResponse: Message = {
                                        id: (Date.now() + 1).toString(),
                                        text: `Excellent choice! ${action} is one of our core services. Let me tell you more about our capabilities in this area.`,
                                        sender: 'bot',
                                        timestamp: new Date(),
                                        type: 'text'
                              };
                              setMessages(prev => [...prev, botResponse]);
                              setIsTyping(false);
                    }, 1500);
          };

          const handleKeyPress = (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                    }
          };

          return (
                    <>
                              {/* FAB Group */}
                              {!isOpen && (
                                        <div
                                                  className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-3"
                                        >                                                  {/* Main Chatbot Toggle */}
                                                  <Button
                                                            onClick={() => setIsOpen(true)}
                                                            className="w-14 h-14 rounded-full bg-primary hover:bg-primary-dark shadow-strong hover:shadow-strong transition-all duration-300 hover:scale-110"
                                                            size="lg"
                                                  >
                                                            <MessageCircle className="w-6 h-6" />
                                                  </Button>
                                                  {/* Action Buttons */}
                                                  <div
                                                            className="flex flex-col items-center gap-3"
                                                  >
                                                            <Button
                                                                      onClick={() => {
                                                                                window.location.href = 'tel:+15551234567';
                                                                      }}
                                                                      className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
                                                                      size="icon"
                                                                      aria-label="Call us"
                                                            >
                                                                      <PhoneCall className="w-6 h-6" />
                                                            </Button>
                                                            <Button
                                                                      onClick={() => {
                                                                                const text = encodeURIComponent("Hi TriNextGen, I'm interested in your services.");
                                                                                window.open(`https://wa.me/15551234567?text=${text}`, '_blank');
                                                                      }}
                                                                      className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
                                                                      size="icon"
                                                                      aria-label="Message on WhatsApp"
                                                            >
                                                                      <WhatsAppIcon className="w-6 h-6" />
                                                            </Button>
                                                  </div>
                                        </div>
                              )}

                              {/* Chatbot Window */}
                              {isOpen && (
                                        <Card ref={cardRef} className={`fixed w-96 shadow-strong border-0 bg-card/95 backdrop-blur-md z-50 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'
                                                  }`} style={{ left: position.x, top: position.y, cursor: isDragging ? 'grabbing' as const : 'default' }}>
                                                  <CardHeader onMouseDown={onMouseDownHeader} className="pb-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-t-lg select-none cursor-move">
                                                            <div className="flex items-center justify-between">
                                                                      <div className="flex items-center space-x-3">
                                                                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                                                                          <Bot className="w-5 h-5" />
                                                                                </div>
                                                                                <div>
                                                                                          <CardTitle className="text-lg font-semibold">TriNextGen Assistant</CardTitle>
                                                                                          <div className="flex items-center space-x-1">
                                                                                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                                                                    <span className="text-xs text-white/80">Online</span>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                                      <div className="flex items-center space-x-2">
                                                                                <Button
                                                                                          variant="ghost"
                                                                                          size="sm"
                                                                                          onClick={() => setIsMinimized(!isMinimized)}
                                                                                          className="text-white hover:bg-white/20 h-8 w-8 p-0"
                                                                                >
                                                                                          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                                                                </Button>
                                                                                <Button
                                                                                          variant="ghost"
                                                                                          size="sm"
                                                                                          onClick={() => setIsOpen(false)}
                                                                                          className="text-white hover:bg-white/20 h-8 w-8 p-0"
                                                                                >
                                                                                          <X className="w-4 h-4" />
                                                                                </Button>
                                                                      </div>
                                                            </div>
                                                  </CardHeader>

                                                  {!isMinimized && (
                                                            <>
                                                                      <CardContent className="p-0 flex flex-col h-[500px]">
                                                                                {/* Messages Area */}
                                                                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                                                                          {messages.map((message) => (
                                                                                                    <div
                                                                                                              key={message.id}
                                                                                                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                                                                                                    >
                                                                                                              <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                                                                                                        }`}>
                                                                                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user'
                                                                                                                                  ? 'bg-primary text-white'
                                                                                                                                  : 'bg-secondary text-foreground'
                                                                                                                                  }`}>
                                                                                                                                  {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                                                                                                        </div>
                                                                                                                        <div className={`px-4 py-2 rounded-2xl ${message.sender === 'user'
                                                                                                                                  ? 'bg-primary text-white'
                                                                                                                                  : 'bg-secondary text-foreground'
                                                                                                                                  }`}>
                                                                                                                                  <p className="text-sm">{message.text}</p>
                                                                                                                                  <span className="text-xs opacity-70">
                                                                                                                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                                                                                  </span>
                                                                                                                        </div>
                                                                                                              </div>
                                                                                                    </div>
                                                                                          ))}

                                                                                          {isTyping && (
                                                                                                    <div className="flex justify-start animate-fade-in">
                                                                                                              <div className="flex items-start space-x-2">
                                                                                                                        <div className="w-8 h-8 rounded-full bg-secondary text-foreground flex items-center justify-center">
                                                                                                                                  <Bot className="w-4 h-4" />
                                                                                                                        </div>
                                                                                                                        <div className="px-4 py-2 rounded-2xl bg-secondary text-foreground">
                                                                                                                                  <div className="flex space-x-1">
                                                                                                                                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                                                                                                                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                                                                                                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                                                                                                  </div>
                                                                                                                        </div>
                                                                                                              </div>
                                                                                                    </div>
                                                                                          )}

                                                                                          <div ref={messagesEndRef} />
                                                                                </div>

                                                                                {/* Quick Actions */}
                                                                                {messages.length === 1 && (
                                                                                          <div className="p-4 border-t border-border">
                                                                                                    <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
                                                                                                    <div className="grid grid-cols-2 gap-2">
                                                                                                              {quickActions.map((action, index) => (
                                                                                                                        <Button
                                                                                                                                  key={index}
                                                                                                                                  variant="outline"
                                                                                                                                  size="sm"
                                                                                                                                  onClick={() => handleQuickAction(action.text)}
                                                                                                                                  className="justify-start text-xs hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                                                                                                                        >
                                                                                                                                  <action.icon className="w-3 h-3 mr-2" />
                                                                                                                                  {action.text}
                                                                                                                        </Button>
                                                                                                              ))}
                                                                                                    </div>
                                                                                          </div>
                                                                                )}

                                                                                {/* Input Area */}
                                                                                <div className="p-4 border-t border-border">
                                                                                          <div className="flex space-x-2">
                                                                                                    <Input
                                                                                                              ref={inputRef}
                                                                                                              value={inputValue}
                                                                                                              onChange={(e) => setInputValue(e.target.value)}
                                                                                                              onKeyPress={handleKeyPress}
                                                                                                              placeholder="Type your message..."
                                                                                                              className="flex-1"
                                                                                                              disabled={isTyping}
                                                                                                    />
                                                                                                    <Button
                                                                                                              onClick={handleSendMessage}
                                                                                                              disabled={!inputValue.trim() || isTyping}
                                                                                                              size="sm"
                                                                                                              className="bg-primary hover:bg-primary-dark transition-all duration-300 hover:scale-105"
                                                                                                    >
                                                                                                              <Send className="w-4 h-4" />
                                                                                                    </Button>
                                                                                          </div>
                                                                                </div>
                                                                      </CardContent>
                                                            </>
                                                  )}
                                        </Card>
                              )}
                    </>
          );
};

export default Chatbot;
