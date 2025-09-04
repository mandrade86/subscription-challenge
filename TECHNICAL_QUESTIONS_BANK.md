# 🎯 Technical Questions Bank - Addressing Client Feedback

## 🚨 **Questions to Address Specific Client Concerns**

### **1. "Struggled to go deeper in critical areas"**

#### **Deep Dive Questions:**

**Concurrency & Race Conditions:**
- "Walk me through what happens when 1000 users click 'Subscribe' at exactly the same time for a limited product."
- "How would you prevent a user from being charged twice if the payment webhook arrives while the system is processing the first one?"
- "Implement a function that ensures only one user can get the last available seat, even with concurrent requests."

**Database Consistency:**
- "A user's payment succeeded, but our database crashed before creating the subscription. How do you handle this scenario?"
- "How would you implement a two-phase commit for a subscription that involves payment processing and inventory management?"
- "What happens if the inventory service is down when a user tries to subscribe?"

**System Resilience:**
- "The payment gateway is experiencing 50% failure rate. How do you ensure subscriptions are eventually created?"
- "How would you handle a scenario where the notification service is down for 2 hours?"
- "Design a retry mechanism that doesn't overwhelm external services during outages."

### **2. "Limited confidence in database design choices"**

#### **Database Design Deep Dive:**

**SQL vs NoSQL Justification:**
- "You mentioned MongoDB. Walk me through the specific queries you'll need for this subscription system."
- "How would you handle complex reporting queries with MongoDB vs PostgreSQL?"
- "What are the ACID implications of your database choice for financial transactions?"

**Schema Design:**
- "Design a schema that can handle 10M+ subscriptions with efficient querying."
- "How would you model subscription history and audit trails?"
- "What indexes would you create and why?"

**Data Modeling:**
- "How would you handle subscription upgrades/downgrades while maintaining data integrity?"
- "Design a schema for handling prorated billing calculations."
- "How would you model subscription states (trial, active, paused, cancelled)?"

### **3. "Missed important details such as read/write separation"**

#### **Scalability Architecture:**

**Read/Write Separation:**
- "How would you implement read replicas for this subscription system?"
- "What data would you put on read replicas vs the primary database?"
- "How would you handle eventual consistency between read and write databases?"

**Caching Strategy:**
- "Design a caching strategy for user subscription data."
- "How would you handle cache invalidation when a subscription is updated?"
- "What would you cache at the application level vs CDN level?"

**Load Balancing:**
- "How would you distribute load across multiple application servers?"
- "What session management strategy would you use for a stateless architecture?"
- "How would you handle sticky sessions vs stateless design?"

### **4. "Could not provide a viable answer for seat reservation integrity"**

#### **Concurrency Challenge:**

**The Core Problem:**
```typescript
// Present this exact scenario:
// "1000 users try to reserve the last available seat simultaneously.
// Only one should succeed. Implement this."

interface SeatReservation {
  seatId: string;
  userId: string;
  timestamp: Date;
}

async function reserveSeat(seatId: string, userId: string): Promise<SeatReservation> {
  // Candidate must implement proper concurrency control
  // Test with: Promise.all(Array(1000).fill().map(() => reserveSeat('seat1', 'user' + Math.random())))
}
```

**Expected Solutions:**
1. **Database-level locking** (SELECT FOR UPDATE)
2. **Optimistic locking** with version fields
3. **Distributed locks** using Redis
4. **Event sourcing** with conflict resolution

**Follow-up Questions:**
- "What happens if the database transaction times out?"
- "How would you handle the case where the user's session expires during reservation?"
- "What if the payment fails after the seat is reserved?"

### **5. "Stayed too superficial on payment flow and orchestration"**

#### **Payment Orchestration Deep Dive:**

**Webhook Handling:**
```typescript
// Present this scenario:
// "Design a webhook handler that processes payment confirmations
// with proper idempotency, retry logic, and eventual consistency"

interface PaymentWebhook {
  paymentId: string;
  status: 'success' | 'failed' | 'pending';
  amount: number;
  userId: string;
  idempotencyKey: string;
}

@Post('/webhooks/payment')
async handlePaymentWebhook(@Body() webhook: PaymentWebhook) {
  // Must handle:
  // - Duplicate webhooks
  // - Failed processing
  // - Retry logic with exponential backoff
  // - Dead letter queue for failed messages
  // - Idempotency
}
```

**Orchestration Patterns:**
- "How would you implement a saga pattern for subscription creation?"
- "What happens if the inventory service fails after payment is processed?"
- "How would you handle partial failures in a multi-step subscription process?"

**Event-Driven Architecture:**
- "Design an event system for subscription lifecycle events."
- "How would you ensure events are delivered in order?"
- "What happens if an event is lost or duplicated?"

### **6. "Did not tie SNS effectively into the overall design"**

#### **Notification System Integration:**

**Event-Driven Notifications:**
```typescript
// Present this scenario:
// "Design a notification system that sends emails, SMS, and push notifications
// for subscription events with proper error handling and retry logic"

class NotificationService {
  async sendSubscriptionConfirmation(subscription: Subscription) {
    // Must handle:
    // - Multiple notification channels
    // - Retry logic for failed notifications
    // - User preferences
    // - Rate limiting
    // - Dead letter queue
  }
}
```

**Integration Questions:**
- "How would you handle notification failures without affecting the subscription process?"
- "What's your strategy for handling high-volume notification bursts?"
- "How would you implement user notification preferences?"

---

## 🎯 **Practical Coding Challenges**

### **Challenge 1: Concurrency Test**
```typescript
// Test concurrent seat reservation
async function testConcurrency() {
  const promises = Array(1000).fill().map((_, i) => 
    reserveSeat('last-seat', `user-${i}`)
  );
  
  const results = await Promise.allSettled(promises);
  const successful = results.filter(r => r.status === 'fulfilled');
  
  // Should be exactly 1 successful reservation
  console.log(`Successful reservations: ${successful.length}`);
}
```

### **Challenge 2: Payment Webhook Idempotency**
```typescript
// Test webhook idempotency
async function testWebhookIdempotency() {
  const webhook = { paymentId: '123', status: 'success', idempotencyKey: 'abc' };
  
  // Send same webhook multiple times
  await handlePaymentWebhook(webhook);
  await handlePaymentWebhook(webhook);
  await handlePaymentWebhook(webhook);
  
  // Should only create one subscription
  const subscriptions = await getSubscriptionsByPaymentId('123');
  console.log(`Subscriptions created: ${subscriptions.length}`); // Should be 1
}
```

### **Challenge 3: System Resilience**
```typescript
// Test system resilience
async function testSystemResilience() {
  // Simulate external service failures
  const paymentService = new MockPaymentService({ failureRate: 0.5 });
  const notificationService = new MockNotificationService({ failureRate: 0.3 });
  
  // Create subscription with retry logic
  const subscription = await createSubscriptionWithRetry({
    userId: 'user1',
    productId: 'product1',
    paymentService,
    notificationService
  });
  
  // Should eventually succeed despite failures
  expect(subscription).toBeDefined();
}
```

---

## 📊 **Evaluation Checklist**

### **Concurrency & Data Integrity (25 points)**
- [ ] **Proper locking mechanisms** (5 points)
- [ ] **Transaction handling** (5 points)
- [ ] **Race condition prevention** (5 points)
- [ ] **Idempotency implementation** (5 points)
- [ ] **Error recovery strategies** (5 points)

### **System Design & Architecture (25 points)**
- [ ] **Justified technology choices** (5 points)
- [ ] **Proper error handling** (5 points)
- [ ] **Database design rationale** (5 points)
- [ ] **API design principles** (5 points)
- [ ] **Monitoring considerations** (5 points)

### **Scalability & Performance (20 points)**
- [ ] **Caching strategies** (5 points)
- [ ] **Database optimization** (5 points)
- [ ] **Load balancing considerations** (5 points)
- [ ] **Performance monitoring** (5 points)

### **Code Quality & Best Practices (20 points)**
- [ ] **Clean, maintainable code** (5 points)
- [ ] **Type safety** (5 points)
- [ ] **Error handling** (5 points)
- [ ] **Testing considerations** (5 points)

### **Advanced Topics (10 points)**
- [ ] **Distributed systems knowledge** (5 points)
- [ ] **Security considerations** (5 points)

---

## 🚨 **Red Flags - Immediate Rejection**

### **Critical Issues:**
- ❌ **No concurrency handling** - Will fail in production
- ❌ **No error handling** - System will crash
- ❌ **No justification** for technical decisions
- ❌ **Security vulnerabilities** - Exposed sensitive data
- ❌ **No idempotency** - Will create duplicate records

### **Major Concerns:**
- ⚠️ **Poor database design** - Will not scale
- ⚠️ **No retry mechanisms** - Unreliable external integrations
- ⚠️ **No monitoring** - Cannot debug production issues
- ⚠️ **Hardcoded values** - Not production-ready
- ⚠️ **No transaction handling** - Data inconsistency

---

## 💡 **Expected Answers Summary**

### **For Concurrency:**
- Use database transactions with proper locking
- Implement optimistic locking with version fields
- Use distributed locks for multi-service scenarios
- Handle timeouts and rollbacks gracefully

### **For Payment Webhooks:**
- Implement idempotency using unique keys
- Use retry logic with exponential backoff
- Implement dead letter queues for failed messages
- Use event sourcing for audit trails

### **For Scalability:**
- Implement read/write separation
- Use caching at multiple layers
- Implement proper indexing strategies
- Use load balancing and horizontal scaling

### **For System Design:**
- Justify technology choices with specific use cases
- Implement proper error handling and monitoring
- Use appropriate design patterns (Saga, CQRS, etc.)
- Consider security and compliance requirements
