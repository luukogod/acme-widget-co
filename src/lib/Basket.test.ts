import { Basket } from './Basket';
import { products, deliveryRules, offers } from './catalogue';

/**
 * Test suite for the Basket class
 * Validates all the test cases provided in the requirements
 */

function testBasket(productCodes: string[], expectedTotal: number, testName: string): boolean {
  const basket = new Basket(products, deliveryRules, offers);
  
  productCodes.forEach(code => basket.add(code));
  
  const total = basket.total();
  const breakdown = basket.getBreakdown();
  
  console.log(`\n${testName}`);
  console.log('Products:', productCodes.join(', '));
  console.log('Subtotal:', `$${breakdown.subtotal.toFixed(2)}`);
  console.log('Offer Discount:', breakdown.offerDiscount > 0 ? `-$${breakdown.offerDiscount.toFixed(2)}` : '$0.00');
  console.log('Delivery:', breakdown.deliveryCost === 0 ? 'FREE' : `$${breakdown.deliveryCost.toFixed(2)}`);
  console.log('Total:', `$${total.toFixed(2)}`);
  console.log('Expected:', `$${expectedTotal.toFixed(2)}`);
  
  const passed = Math.abs(total - expectedTotal) < 0.01;
  console.log('Status:', passed ? '✅ PASSED' : '❌ FAILED');
  
  if (!passed) {
    console.error(`Expected $${expectedTotal.toFixed(2)} but got $${total.toFixed(2)}`);
  }
  
  return passed;
}

console.log('='.repeat(60));
console.log('ACME WIDGET CO - BASKET TESTS');
console.log('='.repeat(60));

// Test Case 1: B01, G01 = $37.85
testBasket(['B01', 'G01'], 37.85, 'Test 1: B01, G01');

// Test Case 2: R01, R01 = $54.37
testBasket(['R01', 'R01'], 54.37, 'Test 2: R01, R01 (with offer)');

// Test Case 3: R01, G01 = $60.85
testBasket(['R01', 'G01'], 60.85, 'Test 3: R01, G01');

// Test Case 4: B01, B01, R01, R01, R01 = $98.27
testBasket(['B01', 'B01', 'R01', 'R01', 'R01'], 98.27, 'Test 4: B01, B01, R01, R01, R01');

console.log('\n' + '='.repeat(60));
console.log('All test cases completed!');
console.log('='.repeat(60));
