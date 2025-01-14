// types/index.ts
export interface Flight {
  from: string;
  to: string;
  date: string;
  price: number;
  duration: string;
  airline?: string;
}

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  flights?: Flight[];
  isError?: boolean;
}

export interface ApiResponse {
  message: string;
  flights?: Flight[];
}