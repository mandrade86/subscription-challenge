# 🎯 Technical Evaluation Guide - Senior Fullstack Developer

## 📋 **Pre-Challenge Screening Questions (15 minutes)**

### **1. Concurrency & Data Consistency**
- "How would you handle a scenario where 1000 users try to reserve the last available seat simultaneously?"
- "Explain the difference between optimistic and pessimistic locking. When would you use each?"
- "How do you ensure data consistency in a distributed system without strong consistency?"

### **2. Database Design & Architecture**
- "Walk me through your decision process for choosing between SQL and NoSQL for a subscription system."
- "How would you design a database schema for a multi-tenant subscription platform with 1M+ users?"
- "What are the trade-offs between microservices and monoliths for this type of system?"

### **3. Scalability & Performance**
- "How would you scale this system to handle 100K concurrent users?"
- "Explain read/write separation strategies and when to implement them."
- "What caching strategies would you implement and at which layers?"

---

## 🔍 **During Challenge Technical Questions (30 minutes)**

### **Phase 1: Implementation Review (10 minutes)**

**When reviewing their code, ask:**

#### **Concurrency Handling**
- "I see you're creating a subscription. What happens if two users try to subscribe to the same product simultaneously?"
- "How would you prevent double-charging a user if the payment webhook arrives twice?"
- "Show me how you would implement seat reservation with proper locking."

#### **Database Design**
- "Why did you choose this specific schema design?"
- "How would you handle a scenario where a product becomes unavailable after a user starts the subscription process?"
- "What indexes would you add to optimize query performance?"

### **Phase 2: Edge Cases & Error Handling (10 minutes)**

#### **Payment Flow & Orchestration**
- "The payment webhook failed. How do you ensure the subscription is eventually created?"
- "A user's payment succeeded but our system crashed before creating the subscription. How do you handle this?"
- "How would you implement idempotency for payment processing?"

#### **System Resilience**
- "What happens if the database is temporarily unavailable during a subscription creation?"
- "How would you handle partial failures in a multi-step subscription process?"
- "Describe your retry strategy for external API calls."

### **Phase 3: Scalability & Architecture (10 minutes)**

#### **System Design**
- "How would you redesign this system for 1M+ users?"
- "Where would you implement caching and what would you cache?"
- "How would you handle database sharding for user data?"

#### **Monitoring & Observability**
- "How would you monitor the health of this subscription system?"
- "What metrics would you track to ensure system reliability?"
- "How would you debug a performance issue affecting 10% of users?"

---

## 🎯 **Specific Technical Challenges to Present**

### **Challenge 1: Concurrency Test**
```typescript
// Present this scenario:
// "Implement a function that reserves the last available seat
// ensuring only one user can get it, even with 1000 concurrent requests"

async reserveLastSeat(userId: string): Promise<ReservationResult> {
  // Candidate must implement proper locking mechanism
  // Test with concurrent requests to verify correctness
}
```

### **Challenge 2: Payment Webhook Handling**
```typescript
// "Design a webhook handler that processes payment confirmations
// with proper idempotency and retry logic"

@Post('/webhooks/payment')
async handlePaymentWebhook(@Body() webhook: PaymentWebhook) {
  // Must handle:
  // - Duplicate webhooks
  // - Failed processing
  // - Retry logic
  // - Eventual consistency
}
```

### **Challenge 3: Scalability Design**
```typescript
// "Design a notification system that can handle 100K+ users
// with guaranteed delivery and proper error handling"

class NotificationService {
  // Must consider:
  // - Message queuing
  // - Retry mechanisms
  // - Dead letter queues
  // - Rate limiting
}
```

---

## 📊 **Evaluation Rubric**

### **Must Have (Pass/Fail) - 70%**

#### **Concurrency & Data Integrity (25%)**
- [ ] **Proper locking mechanisms** implemented
- [ ] **Transaction handling** for multi-step operations
- [ ] **Idempotency** for critical operations
- [ ] **Race condition prevention** in concurrent scenarios

#### **System Design (25%)**
- [ ] **Justified technology choices** with clear reasoning
- [ ] **Proper error handling** with retry strategies
- [ ] **Database design** appropriate for use case
- [ ] **API design** following REST principles

#### **Code Quality (20%)**
- [ ] **Clean, maintainable code** with proper structure
- [ ] **Type safety** and proper TypeScript usage
- [ ] **Error handling** throughout the application
- [ ] **Logging and monitoring** considerations

### **Should Have (Extra Points) - 20%**

#### **Scalability (10%)**
- [ ] **Caching strategies** implemented
- [ ] **Database optimization** (indexes, queries)
- [ ] **Performance considerations** in design
- [ ] **Load balancing** and horizontal scaling

#### **Architecture (10%)**
- [ ] **Microservices considerations** if applicable
- [ ] **Event-driven architecture** patterns
- [ ] **Monitoring and observability** setup
- [ ] **Security considerations** implemented

### **Nice to Have (Bonus) - 10%**

#### **Advanced Topics (10%)**
- [ ] **Distributed systems** knowledge
- [ ] **Testing strategies** (unit, integration, e2e)
- [ ] **CI/CD pipeline** considerations
- [ ] **Documentation** and code comments

---

## 🚨 **Red Flags to Watch For**

### **Critical Issues (Immediate Rejection)**
- ❌ **No concurrency handling** - Basic race conditions
- ❌ **No error handling** - System will fail in production
- ❌ **No justification** for technical decisions
- ❌ **Security vulnerabilities** - Exposed sensitive data

### **Major Concerns (Requires Strong Justification)**
- ⚠️ **Poor database design** - Will not scale
- ⚠️ **No retry mechanisms** - Unreliable external integrations
- ⚠️ **No monitoring** - Cannot debug production issues
- ⚠️ **Hardcoded values** - Not production-ready

### **Minor Issues (Deduct Points)**
- 🔸 **Code duplication** - Maintenance issues
- 🔸 **Poor naming** - Code readability
- 🔸 **Missing validation** - Input sanitization
- 🔸 **No documentation** - Knowledge transfer issues

---

## 💡 **Follow-up Questions for Each Area**

### **If they struggle with concurrency:**
- "What happens if the database transaction fails after the payment is processed?"
- "How would you implement a distributed lock using Redis?"
- "Explain the CAP theorem and how it applies to your design."

### **If they struggle with scalability:**
- "How would you handle database connection pooling with 10K concurrent users?"
- "What's the difference between horizontal and vertical scaling?"
- "How would you implement circuit breakers for external services?"

### **If they struggle with architecture:**
- "How would you handle service discovery in a microservices architecture?"
- "What's the difference between eventual consistency and strong consistency?"
- "How would you implement event sourcing for audit trails?"

---

## 🎯 **Expected Answers for Key Questions**

### **Concurrency Question:**
```typescript
// Expected approach for seat reservation
async reserveSeat(seatId: string, userId: string) {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const seat = await Seat.findById(seatId).session(session);
    if (!seat.available) {
      throw new ConflictException('Seat not available');
    }
    
    await Seat.findByIdAndUpdate(seatId, { 
      available: false, 
      reservedBy: userId 
    }).session(session);
    
    await session.commitTransaction();
    return { success: true, seatId };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
```

### **Payment Webhook Question:**
```typescript
// Expected approach for idempotent webhook handling
@Post('/webhooks/payment')
async handlePaymentWebhook(@Body() webhook: PaymentWebhook) {
  const idempotencyKey = webhook.idempotencyKey;
  
  // Check if already processed
  const existing = await PaymentLog.findOne({ idempotencyKey });
  if (existing) {
    return { status: 'already_processed', id: existing._id };
  }
  
  // Process with retry logic
  return await this.processPaymentWithRetry(webhook, idempotencyKey);
}
```

---

## 📝 **Evaluation Notes Template**

```
Candidate: _________________
Date: _________________
Evaluator: _________________

## Technical Assessment

### Concurrency & Data Integrity: ___/25
- Locking mechanisms: ___/10
- Transaction handling: ___/10
- Race condition prevention: ___/5

### System Design: ___/25
- Technology choices: ___/10
- Error handling: ___/10
- Database design: ___/5

### Code Quality: ___/20
- Clean code: ___/10
- Type safety: ___/5
- Error handling: ___/5

### Scalability: ___/10
- Caching: ___/5
- Performance: ___/5

### Architecture: ___/10
- Patterns: ___/5
- Monitoring: ___/5

### Advanced Topics: ___/10
- Testing: ___/5
- Documentation: ___/5

## Total Score: ___/100

## Key Strengths:
- 
- 
- 

## Areas for Improvement:
- 
- 
- 

## Recommendation: [ ] HIRE [ ] NO HIRE [ ] MAYBE

## Notes:
```
