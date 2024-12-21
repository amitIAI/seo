import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Model } from '../types';
import { fetchModels } from '../services/api';

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  apiKey: string;
}

export function ModelSelector({ selectedModel, setSelectedModel, apiKey }: ModelSelectorProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      if (!apiKey) return;
      
      setLoading(true);
      setError('');
      
      try {
        const modelList = await fetchModels(apiKey);
        setModels(modelList);
        
        if (!selectedModel && modelList.length > 0) {
          setSelectedModel(modelList[0].id);
        }
      } catch (err) {
        setError('Failed to load models. Please check your API key.');
      } finally {
        setLoading(false);
      }
    };

    loadModels();
  }, [apiKey]);

  return (
    <div className="relative w-full">
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        disabled={loading || !apiKey}
      >
        {loading ? (
          <option>Loading models...</option>
        ) : error ? (
          <option>{error}</option>
        ) : (
          models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))
        )}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
}