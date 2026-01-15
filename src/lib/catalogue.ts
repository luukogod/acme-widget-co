import type { Product, DeliveryRule, Offer } from '../types';

// Product catalogue
export const products: Record<string, Product> = {
  R01: { code: 'R01', name: 'Red Widget', price: 32.95 },
  G01: { code: 'G01', name: 'Green Widget', price: 24.95 },
  B01: { code: 'B01', name: 'Blue Widget', price: 7.95 },
};

// Delivery charge rules 
export const deliveryRules: DeliveryRule[] = [
  { threshold: 90, cost: 0 },   
  { threshold: 50, cost: 2.95 },
  { threshold: 0, cost: 4.95 },  
];

// Special offers
export const offers: Offer[] = [
  {
    type: 'buy_x_get_y_discount',
    productCode: 'R01',
    requiredQuantity: 2,
    discountedQuantity: 1,
    discountPercentage: 50,
  },
];
