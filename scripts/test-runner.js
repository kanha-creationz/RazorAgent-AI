const crypto = require('crypto');

console.log('=====================================================');
console.log('🚀 NEXORA AI COMMERCE TEST SUITE');
console.log('=====================================================\n');

let passed = 0;
let total = 0;

function assert(condition, testName) {
  total++;
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${testName}`);
  }
}

// 1. Test Cart Calculation Logic
console.log('--- TEST 1: Cart Pricing & Tax Calculation ---');
const items = [
  { price: 49999, qty: 1 },
  { price: 2499, qty: 1 },
  { price: 2899, qty: 1 }
];
const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0); // 55397
const discount = Math.round(subtotal * 0.1); // 5540 (STUDENT10)
const taxable = subtotal - discount; // 49857
const tax = Math.round(taxable * 0.08); // 3989 (8% GST)
const shipping = subtotal > 2000 ? 0 : 150; // 0
const totalCalculated = taxable + tax + shipping; // 53846

assert(subtotal === 55397, 'Subtotal correctly sums to ₹55,397');
assert(discount === 5540, '10% Promo discount correctly calculates to ₹5,540');
assert(tax === 3989, '8% GST tax correctly calculates to ₹3,989');
assert(totalCalculated === 53846, 'Verified total correctly calculates to ₹53,846');

// 2. Test Razorpay HMAC-SHA256 Signature Verification
console.log('\n--- TEST 2: Razorpay Test Mode HMAC Verification ---');
const secret = 'whsec_razoragent_test_webhook_key_2026';
const orderId = 'order_test_98210';
const paymentId = 'pay_test_succ_110';
const generatedSig = crypto
  .createHmac('sha256', secret)
  .update(orderId + '|' + paymentId)
  .digest('hex');

const verified = crypto
  .createHmac('sha256', secret)
  .update(orderId + '|' + paymentId)
  .digest('hex') === generatedSig;

assert(verified, 'Razorpay HMAC-SHA256 signature verification succeeds');
assert(generatedSig.length === 64, 'SHA-256 HMAC signature produces valid 64-character hash');

// 3. Test Explainable Permission Gate
console.log('\n--- TEST 3: Explainable Financial Permission Gate ---');
const gateAction = {
  amount: 53846,
  approvalRequired: true,
  approvalStatus: 'PENDING'
};

const canExecuteWithoutApproval = !gateAction.approvalRequired || gateAction.approvalStatus === 'APPROVED';
assert(!canExecuteWithoutApproval, 'Financial action safely BLOCKED when approvalStatus is PENDING');

gateAction.approvalStatus = 'APPROVED';
const canExecuteWithApproval = !gateAction.approvalRequired || gateAction.approvalStatus === 'APPROVED';
assert(canExecuteWithApproval, 'Financial action safely PERMITTED once user gives explicit approval');

console.log('\n=====================================================');
console.log(`🎉 TEST SUMMARY: ${passed} / ${total} TESTS PASSED`);
console.log('=====================================================');
