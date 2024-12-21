import { Model } from '../types';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';

export async function fetchModels(apiKey: string): Promise<Model[]> {
  const response = await fetch(`${OPENROUTER_API_URL}/models`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }

  const data = await response.json();
  return data.data.sort((a: Model, b: Model) => a.name.localeCompare(b.name));
}

export async function generateContent(
  apiKey: string,
  model: string,
  prompt: string
): Promise<string> {
  const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate content');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}