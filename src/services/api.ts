// services/api.ts
import { ApiResponse } from '../types';

const API_URL = 'https://web.cari1412.online';

export async function sendMessage(content: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ message: content }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}