# 🛒 Acme Widget Co - Sales System POC

A modern, responsive e-commerce application built with React, TypeScript, and Vite. This proof of concept demonstrates a flexible basket system with dynamic pricing, delivery rules, and promotional offers.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Product Catalogue](#-product-catalogue)
- [Business Rules](#-business-rules)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Implementation Highlights](#-implementation-highlights)
- [Assumptions & Design Decisions](#-assumptions--design-decisions)

---

## 🎯 Overview

Acme Widget Co's sales system provides customers with an intuitive shopping experience while automatically applying delivery discounts and promotional offers. The system is built with scalability in mind, allowing easy addition of new products, delivery rules, and promotional campaigns.

### Key Capabilities

- **Dynamic Pricing Engine**: Automatically calculates totals with delivery costs and promotional discounts
- **Flexible Rule System**: Configurable delivery thresholds and offer mechanics
- **Real-time Updates**: Instant basket recalculation as items are added or removed
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

---

## ✨ Features

### Core Functionality

- ✅ Add products to basket with real-time total updates
- ✅ Increase/decrease item quantities with intuitive controls
- ✅ Automatic application of delivery charge rules based on order value
- ✅ Promotional offer system (currently: buy one red widget, get the second half price)
- ✅ Detailed cost breakdown showing subtotal, discounts, delivery, and total
- ✅ Clear basket functionality with one click
- ✅ Empty state guidance for better UX

### Technical Features

- 🎨 Modern, professional UI with smooth animations
- 📱 Fully responsive design (mobile-first approach)
- ♿ Accessibility-focused with ARIA labels and keyboard navigation
- 🧪 Comprehensive unit tests with Vitest
- 🔒 Type-safe implementation with strict TypeScript
- ⚡ Optimized performance with React hooks (useMemo, useCallback)
- 🎯 Clean separation of concerns (business logic, UI, state management)

---

## 📦 Product Catalogue

| Product Code | Product Name   | Price   | Color Theme |
|--------------|----------------|---------|-------------|
| R01          | Red Widget     | $32.95  | 🔴 Red      |
| G01          | Green Widget   | $24.95  | 🟢 Green    |
| B01          | Blue Widget    | $7.95   | 🔵 Blue     |

---

## 💰 Business Rules

### Delivery Charge Rules

The system implements tiered delivery pricing to incentivize larger purchases:

| Order Total      | Delivery Cost |
|------------------|---------------|
| Under $50.00     | $4.95         |
| $50.00 - $89.99  | $2.95         |
| $90.00 or more   | FREE          |

**Implementation Note**: Delivery costs are calculated based on the subtotal **after** promotional discounts are applied.

### Special Offers

#### Red Widget Promotion
- **Type**: Buy X, Get Y Discount
- **Trigger**: Purchase 2 Red Widgets
- **Discount**: 50% off the second widget
- **Logic**: For every 2 red widgets, one receives a 50% discount
  - Example: Buy 3 red widgets → 2 at full price, 1 at 50% off
  - Example: Buy 4 red widgets → 2 at full price, 2 at 50% off

---

## 🏗️ Architecture

### Design Philosophy

This application follows **SOLID principles** and **separation of concerns**:

1. **Business Logic Layer** (`src/lib/`): Pure TypeScript classes handling basket calculations
2. **UI Layer** (`src/components/`): React components focused solely on presentation
3. **Data Layer** (`src/lib/catalogue.ts`): Centralized product and rules configuration
4. **Type System** (`src/types/`): Shared interfaces ensuring type safety across layers

### Core Components

#### `Basket` Class (`src/lib/Basket.ts`)

The heart of the application - a pure TypeScript class with zero framework dependencies.

**Key Methods:**
- `add(productCode: string)`: Adds a product to the basket
- `remove(productCode: string)`: Removes one instance of a product
- `clear()`: Empties the basket
- `total()`: Calculates final price with all rules applied
- `getBreakdown()`: Returns detailed pricing breakdown for UI display

**Why a class?**
- Framework-agnostic: Can be reused in Node.js, Next.js, or other environments
- Testable: Easy to unit test without React dependencies
- Encapsulated: Internal state managed privately with clean public API

#### React Components

**`ProductCard`** - Displays individual products with:
- Color-coded hero sections matching product type
- Clear pricing display
- Add to basket action

**`BasketDisplay`** - Shows basket state with:
- Item list with quantity controls
- Empty state messaging
- Detailed cost breakdown
- Clear basket functionality

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd acme-widget-co

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run test suite
npm run test:ui      # Run tests with Vitest UI

# Code Quality
npm run lint         # Run ESLint
```

---

## 🧪 Testing

The application includes comprehensive unit tests for the core `Basket` class, validating all business rules and edge cases.

### Running Tests

```bash
npm run test
```

### Test Coverage

The test suite (`src/lib/Basket.test.ts`) validates:

✅ **Basic Operations**
- Adding products to basket
- Removing products from basket
- Clearing the basket
- Handling invalid product codes

✅ **Business Rule Validation**
- Delivery charge tiers (under $50, $50-$90, over $90)
- Red Widget promotional offer (50% off second widget)
- Multiple offer applications (4+ red widgets)
- Complex mixed baskets

✅ **Example Baskets from Specification**

| Products | Expected Total | Status |
|----------|----------------|--------|
| B01, G01 | $37.85 | ✅ Pass |
| R01, R01 | $54.37 | ✅ Pass |
| R01, G01 | $60.85 | ✅ Pass |
| B01, B01, R01, R01, R01 | $98.27 | ✅ Pass |

---

## 📁 Project Structure

```
acme-widget-co/
├── src/
│   ├── components/           # React components
│   │   ├── ProductCard.tsx   # Individual product display
│   │   └── BasketDisplay.tsx # Basket UI with breakdown
│   ├── lib/                  # Business logic (framework-agnostic)
│   │   ├── Basket.ts         # Core basket class
│   │   ├── Basket.test.ts    # Comprehensive test suite
│   │   └── catalogue.ts      # Product & rules configuration
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Shared interfaces
│   ├── App.tsx               # Main application component
│   ├── App.css               # Component-specific styles
│   ├── index.css             # Global styles & design system
│   └── main.tsx              # Application entry point
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

---

## 💡 Implementation Highlights

### 1. Calculation Strategy

The basket total is calculated in this specific order to ensure accurate pricing:

```typescript
const subtotal = calculateSubtotal();              // Sum of all items at full price
const offerDiscount = calculateOfferDiscount();    // Apply promotional offers
const subtotalAfterOffers = subtotal - offerDiscount;
const deliveryCost = calculateDeliveryCost(subtotalAfterOffers);  // Based on discounted total
const total = subtotalAfterOffers + deliveryCost;
```

**Critical Detail**: Delivery costs are calculated on the post-discount subtotal, not the original price. This ensures customers benefit from promotions when qualifying for delivery discounts.

### 2. Offer System Architecture

The offer system is designed for extensibility:

```typescript
interface Offer {
  type: 'buy_x_get_y_discount';  // Extensible for future offer types
  productCode: string;
  requiredQuantity: number;
  discountedQuantity: number;
  discountPercentage: number;
}
```

This structure supports:
- Different offer types (future: BOGO, tiered discounts, etc.)
- Product-specific promotions
- Flexible discount percentages
- Multiple simultaneous offers

### 3. State Management

The application uses React's built-in state management with performance optimizations:

- **`useMemo`**: Memoizes the `Basket` instance to prevent recreation on every render
- **`useCallback`**: Memoizes event handlers to prevent unnecessary child re-renders
- **`useState`**: Manages basket data (items and breakdown) separately from the Basket instance

This approach provides:
- Clean separation between business logic and UI state
- Optimal re-render performance
- Predictable state updates

### 4. Type Safety

Strict TypeScript configuration ensures compile-time safety:

```typescript
// Product codes are type-safe
export type ProductCode = 'R01' | 'G01' | 'B01';

// Interfaces ensure contract adherence
export interface BasketItem {
  product: Product;
  quantity: number;
}
```

---

## 🤔 Assumptions & Design Decisions

### Assumptions Made

1. **Delivery Calculation Timing**: Delivery costs are calculated based on the subtotal **after** offers are applied. This interpretation maximizes customer benefit and seems most aligned with standard e-commerce practices.

2. **Offer Stacking**: Currently, only one type of offer is active (Red Widget promotion). The system is designed to support multiple simultaneous offers in the future, with offers applied in the order they appear in the configuration.

3. **Product Availability**: All products are assumed to be in stock. No inventory management is implemented in this POC.

4. **Currency**: All prices are in USD. No multi-currency support is included.

5. **Quantity Limits**: No maximum quantity restrictions per product or per order.

### Design Decisions

#### Why a Class-Based Basket?

I chose a class over functional composition for the `Basket` because:
- **Encapsulation**: Private state management with a clean public API
- **Stateful Operations**: The basket naturally maintains state across operations
- **Framework Agnostic**: Can be used in Node.js backend, mobile app, or any JS environment
- **Testability**: Easy to unit test without React or DOM dependencies

#### Why Separate Business Logic from React?

The `Basket` class has **zero React dependencies** because:
- **Reusability**: Can be used in a Node.js API, mobile app, or CLI
- **Testing**: Simpler tests without mocking React
- **Performance**: Logic can run outside React's render cycle
- **Maintainability**: Business rules can change without touching UI code

#### UI/UX Decisions

- **Sticky Basket (Desktop)**: Basket remains visible while scrolling through products
- **Empty State Messaging**: Clear guidance when basket is empty
- **Quantity Controls**: Both add and remove buttons for intuitive quantity management
- **Visual Feedback**: Hover states, transitions, and animations for better UX
- **Color Coding**: Products have distinct colors matching their names (Red, Green, Blue)

#### Responsive Strategy

Mobile-first approach with three breakpoints:
- **Mobile**: Stacked layout, full-width cards
- **Tablet**: Optimized spacing, stacked layout
- **Desktop**: Side-by-side layout with sticky basket

---

## 🔮 Future Enhancements

Potential improvements for production:

- [ ] **Persistence**: LocalStorage or API integration for basket state
- [ ] **Analytics**: Track add-to-basket events, conversion rates
- [ ] **A/B Testing**: Framework for testing different offers
- [ ] **Inventory Management**: Stock levels and out-of-stock handling
- [ ] **Multiple Offers**: Support for stacking multiple promotions
- [ ] **Order Checkout**: Complete checkout flow with payment integration
- [ ] **User Accounts**: Save baskets, order history
- [ ] **Admin Panel**: Manage products, offers, and delivery rules
- [ ] **Performance**: Code splitting, lazy loading for larger catalogs
- [ ] **Internationalization**: Multi-language and multi-currency support

---

## 👨‍💻 Author

Built with ❤️ by Kan Chan for Acme Widget Co coding assessment.

---

## 📄 License

This project is created for assessment purposes.

---

## 🙏 Acknowledgments

- React team for the excellent framework
- Vite team for the blazing-fast build tool
- Vitest team for the delightful testing experience
