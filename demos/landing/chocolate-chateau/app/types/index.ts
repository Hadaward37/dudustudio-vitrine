export interface FlavorMap {
  sweetness: number;
  bitterness: number;
  acidity: number;
  creaminess: number;
}

export interface Pairing {
  name: string;
  type: string;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  flavorMap: FlavorMap;
  tastingNotes: string;
  ingredients: string[];
  allergens: string[];
  pairings: Pairing[];
  reviews: Review[];
  badges?: string[];
  isEasterEggTarget?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isGiftWrapped?: boolean;
  giftMessage?: string;
}

export type CheckoutStep = 'delivery' | 'payment' | 'review' | 'confirmation';

export interface DeliveryData {
  email: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  phone: string;
}

export interface PaymentData {
  method: 'credit_card' | 'pix';
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvv?: string;
}

export interface TimelineNode {
  title: string;
  description: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
