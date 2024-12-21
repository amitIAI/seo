import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface OutputSectionProps {
  content: string;
  title: string;
}

export function OutputSection({ content, title }: OutputSectionProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-300">
        <h3 className="font-medium text-gray-700">{title}</h3>
        {content && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        )}
      </div>
      <div className="p-4 prose max-w-none">
        <ReactMarkdown>{content || 'Output will appear here...'}</ReactMarkdown>
      </div>
    </div>
  );
}