import type { BasketItem } from '../types';

interface BasketDisplayProps {
  items: BasketItem[];
  breakdown: {
    subtotal: number;
    offerDiscount: number;
    subtotalAfterOffers: number;
    deliveryCost: number;
    total: number;
  };
  onAddProduct: (productCode: string) => void;
  onRemoveProduct: (productCode: string) => void;
  onClearBasket: () => void;
}

export const BasketDisplay = ({
  items,
  breakdown,
  onAddProduct,
  onRemoveProduct,
  onClearBasket,
}: BasketDisplayProps) => {
  if (items.length === 0) {
    return (
      <div>
        <p>Your basket is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {items.map((item) => (
          <div key={item.product.code}>
            <div>
              <h4>{item.product.name}</h4>
              <p>{item.product.code}</p>
              <p>${item.product.price.toFixed(2)} each</p>
            </div>
            <div>
              <button 
                onClick={() => onRemoveProduct(item.product.code)}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => onAddProduct(item.product.code)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <div>
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div>
        <div>
          <span>Subtotal:</span>
          <span>${breakdown.subtotal.toFixed(2)}</span>
        </div>
        
        {breakdown.offerDiscount > 0 && (
          <div>
            <span>Discount:</span>
            <span>-${breakdown.offerDiscount.toFixed(2)}</span>
          </div>
        )}
        
        <div>
          <span>Delivery:</span>
          <span>
            {breakdown.deliveryCost === 0 
              ? 'FREE' 
              : `$${breakdown.deliveryCost.toFixed(2)}`}
          </span>
        </div>
        
        <div>
          <strong>Total:</strong>
          <strong>${breakdown.total.toFixed(2)}</strong>
        </div>
      </div>

      <button 
        onClick={onClearBasket}
      >
        Clear Basket
      </button>
    </div>
  );
};