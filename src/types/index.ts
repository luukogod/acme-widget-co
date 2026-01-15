// Product types
export interface Product {
  code: string;
  name: string;
  price: number;
}
  
export type ProductCode = 'R01' | 'G01' | 'B01';
  
// Delivery charge rule
export interface DeliveryRule {
  threshold: number;
  cost: number;
}
  
// Offer types
export interface Offer {
  type: 'buy_x_get_y_discount';
  productCode: string;
  requiredQuantity: number;
  discountedQuantity: number;
  discountPercentage: number;
}
  
// Basket item
export interface BasketItem {
  product: Product;
  quantity: number;
}

// Basket breakdown for transparency
export interface BasketBreakdown {
    subtotal: number;
    offerDiscount: number;
    subtotalAfterOffers: number;
    deliveryCost: number;
    total: number;
    appliedOffers: string[];
  }
  
