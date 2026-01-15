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
      <div className="basket-display empty">
        <div className="empty-basket">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Your basket is empty</p>
          <span className="empty-subtitle">Add some widgets to get started</span>
        </div>
      </div>
    );
  }

  return (
    <div className="basket-display">
      <h2 className="basket-title">Your Basket</h2>
      
      <div className="basket-items">
        {items.map((item) => (
          <div key={item.product.code} className="basket-item">
            <div className="item-details">
              <h4 className="item-name">{item.product.name}</h4>
              <p className="item-code">{item.product.code}</p>
              <p className="item-unit-price">${item.product.price.toFixed(2)} each</p>
            </div>
            
            <div className="item-controls">
              <button 
                className="btn btn-quantity"
                onClick={() => onRemoveProduct(item.product.code)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="quantity-display">{item.quantity}</span>
              <button 
                className="btn btn-quantity"
                onClick={() => onAddProduct(item.product.code)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            <div className="item-total">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="basket-breakdown">
        <div className="breakdown-row">
          <span>Subtotal:</span>
          <span>${breakdown.subtotal.toFixed(2)}</span>
        </div>
        
        {breakdown.offerDiscount > 0 && (
          <div className="breakdown-row discount">
            <span>Discount:</span>
            <span className="discount-amount">−${breakdown.offerDiscount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="breakdown-row">
          <span>Delivery:</span>
          <span className={breakdown.deliveryCost === 0 ? 'free-delivery' : ''}>
            {breakdown.deliveryCost === 0 
              ? 'FREE' 
              : `$${breakdown.deliveryCost.toFixed(2)}`}
          </span>
        </div>
        
        <div className="breakdown-row total-row">
          <strong>Total:</strong>
          <strong className="total-amount">${breakdown.total.toFixed(2)}</strong>
        </div>
      </div>

      <button 
        className="btn btn-secondary clear-basket-btn"
        onClick={onClearBasket}
      >
        Clear Basket
      </button>
    </div>
  );
};