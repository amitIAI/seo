import React, { useState } from 'react';
import { Pen } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { ApiKeyInput } from './components/ApiKeyInput';
import { ModelSelector } from './components/ModelSelector';
import { KeywordInput } from './components/KeywordInput';
import { BackgroundInfo } from './components/BackgroundInfo';
import { OutputSection } from './components/OutputSection';
import { generateArticlePrompt, generateOutlinePrompt } from './utils/prompts';
import { generateContent } from './services/api';

function App() {
  const [apiKey, setApiKey] = useState('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');
  const [selectedModel, setSelectedModel] = useState('');
  const [keyword, setKeyword] = useState('');
  const [background, setBackground] = useState('');
  const [outline, setOutline] = useState('');
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState({ outline: false, article: false });

  const handleGenerateContent = async (type: 'outline' | 'article') => {
    if (!apiKey || !selectedModel || !keyword) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading({ ...loading, [type]: true });

    try {
      const prompt = type === 'outline'
        ? generateOutlinePrompt(keyword, background)
        : generateArticlePrompt(keyword, outline, background);

      const content = await generateContent(apiKey, selectedModel, prompt);

      if (type === 'outline') {
        setOutline(content);
      } else {
        setArticle(content);
      }
    } catch (error) {
      toast.error(`Failed to generate ${type}`);
    } finally {
      setLoading({ ...loading, [type]: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Pen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">IRA SEO Writer</h1>
          </div>
          <p className="text-gray-600">Generate SEO-optimized articles with AI</p>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-lg shadow">
          <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
          <ModelSelector 
            selectedModel={selectedModel} 
            setSelectedModel={setSelectedModel}
            apiKey={apiKey}
          />
          <KeywordInput keyword={keyword} setKeyword={setKeyword} />
          <BackgroundInfo background={background} setBackground={setBackground} />
          
          <button
            onClick={() => handleGenerateContent('outline')}
            disabled={loading.outline}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading.outline ? 'Generating Outline...' : 'Generate Outline'}
          </button>

          {outline && (
            <>
              <OutputSection content={outline} title="Generated Outline" />
              <button
                onClick={() => handleGenerateContent('article')}
                disabled={loading.article}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading.article ? 'Writing Article...' : 'Write Article'}
              </button>
            </>
          )}

          {article && <OutputSection content={article} title="Generated Article" />}
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;