
export interface Destination {
  id: string;
  title: string;
  period: string;
  price: number;
  image: string;
  description: string;
  longDescription: string;
  tags: string[];
  coords: string;
  color: string;
  features: string[];
}

export interface CartItem extends Destination {
  bookingId: string;
  date: string;
  crew: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}