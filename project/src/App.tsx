import React, { useState } from 'react';
import { Bot, Send } from 'lucide-react';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import { CodePreview } from './components/CodePreview';
import { generateCode } from './utils/codeGenerator';
import { Message, GeneratedCode } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: 'Hello! I can help you create HTML, CSS, and JavaScript code. Try asking something like "create a contact form" or "make a navigation menu".'
  }]);

  const [generatedCode, setGeneratedCode] = useState<GeneratedCode>({
    html: '',
    css: '',
    js: ''
  });

  const handleSubmit = (input: string) => {
    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    
    // Generate code based on the input
    const { code, response } = generateCode(input, generatedCode);
    const assistantMessage: Message = { role: 'assistant', content: response };
    
    // Update state
    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setGeneratedCode(code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-3 mb-8 text-white">
          <Bot className="w-8 h-8" />
          <h1 className="text-2xl font-bold">AI Code Assistant</h1>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chat section */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
            <ChatMessages messages={messages} />
            <ChatInput onSubmit={handleSubmit} />
          </div>

          {/* Code preview section */}
          <CodePreview code={generatedCode} />
        </div>
      </div>
    </div>
  );
}

export default App;