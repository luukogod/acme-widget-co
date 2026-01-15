import type { Product, DeliveryRule, Offer, BasketItem } from '../types';

export class Basket {
  private items: Map<string, BasketItem> = new Map();
  private productCatalogue: Record<string, Product>;
  private deliveryRules: DeliveryRule[];
  private offers: Offer[];

  constructor(
    productCatalogue: Record<string, Product>,
    deliveryRules: DeliveryRule[],
    offers: Offer[]
  ) {
    this.productCatalogue = productCatalogue;
    this.deliveryRules = deliveryRules;
    this.offers = offers;
  }

  /**
   * Add a product to the basket by its product code
   */
  add(productCode: string): void {
    const product = this.productCatalogue[productCode];
    
    if (!product) {
      throw new Error(`Product ${productCode} not found in catalogue`);
    }

    const existingItem = this.items.get(productCode);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.set(productCode, { product, quantity: 1 });
    }
  }

  /**
   * Remove a product from the basket
   */
  remove(productCode: string): void {
    const existingItem = this.items.get(productCode);
    
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        this.items.delete(productCode);
      }
    }
  }

  /**
   * Clear all items from the basket
   */
  clear(): void {
    this.items.clear();
  }

  /**
   * Get all items in the basket
   */
  getItems(): BasketItem[] {
    return Array.from(this.items.values());
  }

  /**
   * Calculate subtotal before delivery and offers
   */
  private calculateSubtotal(): number {
    let subtotal = 0;
    
    for (const item of this.items.values()) {
      subtotal += item.product.price * item.quantity;
    }
    
    return subtotal;
  }

  /**
   * Apply offers to calculate discount
   */
  private calculateOfferDiscount(): number {
    let totalDiscount = 0;

    for (const offer of this.offers) {
      if (offer.type === 'buy_x_get_y_discount') {
        const item = this.items.get(offer.productCode);
        
        if (item && item.quantity >= offer.requiredQuantity) {
          // Calculate how many times the offer applies
          const offerApplications = Math.floor(item.quantity / offer.requiredQuantity);
          
          // Calculate discount amount
          const discountPerApplication = 
            item.product.price * 
            (offer.discountPercentage / 100) * 
            offer.discountedQuantity;
          
          totalDiscount += discountPerApplication * offerApplications;
        }
      }
    }

    return totalDiscount;
  }

  /**
   * Calculate delivery cost based on subtotal after offers
   */
  private calculateDeliveryCost(subtotalAfterOffers: number): number {
    // Delivery rules should be sorted by threshold descending
    for (const rule of this.deliveryRules) {
      if (subtotalAfterOffers >= rule.threshold) {
        return rule.cost;
      }
    }
    
    // Fallback (shouldn't reach here if rules cover all cases)
    return 0;
  }

  /**
   * Calculate and return the total cost including delivery and offers
   */
  total(): number {
    if (this.items.size === 0) {
      return 0;
    }

    const subtotal = this.calculateSubtotal();
    const offerDiscount = this.calculateOfferDiscount();
    const subtotalAfterOffers = subtotal - offerDiscount;
    const deliveryCost = this.calculateDeliveryCost(subtotalAfterOffers);
    
    return subtotalAfterOffers + deliveryCost;
  }

  /**
   * Get detailed breakdown for display
   */
  getBreakdown() {
    const subtotal = this.calculateSubtotal();
    const offerDiscount = this.calculateOfferDiscount();
    const subtotalAfterOffers = subtotal - offerDiscount;
    const deliveryCost = this.calculateDeliveryCost(subtotalAfterOffers);
    const total = subtotalAfterOffers + deliveryCost;

    return {
      subtotal,
      offerDiscount,
      subtotalAfterOffers,
      deliveryCost,
      total,
    };
  }
}
