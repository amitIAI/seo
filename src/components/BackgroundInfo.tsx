import React from 'react';
import { FileText } from 'lucide-react';

interface BackgroundInfoProps {
  background: string;
  setBackground: (background: string) => void;
}

export function BackgroundInfo({ background, setBackground }: BackgroundInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 50000) {
      setBackground(value);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-5 h-5 text-gray-500" />
        <span className="text-sm text-gray-600">
          Background Information ({background.length}/50,000 characters)
        </span>
      </div>
      <textarea
        value={background}
        onChange={handleChange}
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Paste background information here..."
      />
    </div>
  );
}