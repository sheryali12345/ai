import React, { useState } from 'react';
import { Code, Eye } from 'lucide-react';
import { GeneratedCode } from '../types';

interface CodePreviewProps {
  code: GeneratedCode;
}

export function CodePreview({ code }: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [activeFile, setActiveFile] = useState<'html' | 'css' | 'js'>('html');

  const getFullPreviewCode = () => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${code.css}</style>
      </head>
      <body>
        ${code.html}
        <script>${code.js}</script>
      </body>
    </html>
  `;

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 ${
            activeTab === 'code'
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Code className="w-4 h-4" />
          Code
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 ${
            activeTab === 'preview'
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
      </div>

      {activeTab === 'code' && (
        <>
          <div className="flex border-b bg-gray-50 p-2">
            {(['html', 'css', 'js'] as const).map((file) => (
              <button
                key={file}
                onClick={() => setActiveFile(file)}
                className={`px-3 py-1 rounded ${
                  activeFile === file
                    ? 'bg-white shadow text-blue-600'
                    : 'text-gray-600 hover:bg-white hover:shadow'
                }`}
              >
                {file.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-auto">
            <pre className="p-4 text-sm font-mono">{code[activeFile]}</pre>
          </div>
        </>
      )}

      {activeTab === 'preview' && (
        <div className="flex-1 p-4">
          <iframe
            srcDoc={getFullPreviewCode()}
            className="w-full h-full rounded-lg border border-gray-200"
            title="Preview"
            sandbox="allow-scripts allow-forms"
          />
        </div>
      )}
    </div>
  );
}