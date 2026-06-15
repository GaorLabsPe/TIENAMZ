export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  isBestSeller?: boolean;
  tag?: string;
  images: {
    preview: string; // Background visual representation or mock
    front?: string;
    back?: string;
    details?: string[];
  };
  sizes: string[];
  category: 'coyuntura' | 'raices' | 'esenciales';
  color: string;
  wash: string;
  details: string[];
  quote?: string;
}

export interface CartItem {
  id: string; // Combine product.id + selectedSize
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  mode: 'delivery' | 'pickup';
  address: string;
  reference: string;
  yapeTxCode: string;
}
