import React from 'react';
import { Search } from 'lucide-react';

interface KeywordInputProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export function KeywordInput({ keyword, setKeyword }: KeywordInputProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-500" />
      </div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter main keyword"
      />
    </div>
  );
}