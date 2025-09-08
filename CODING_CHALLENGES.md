# 🎯 Coding Challenges - 6 Key Screening Areas

## 🚀 **Challenge 1: System Design & Architecture (10 minutes)**

### **Scenario**: Design a subscription service for 1M monthly users

**Instructions**: 
1. Explain your architecture choices
2. Design the system components
3. Plan for scalability and reliability

**Expected Deliverables**:
```typescript
// 1. Architecture Diagram (draw or describe)
// 2. Technology Stack Justification
interface ArchitectureDecision {
  database: 'PostgreSQL' | 'MongoDB' | 'Other';
  reason: string;
  tradeoffs: string[];
}

// 3. Load Balancing Strategy
interface LoadBalancingStrategy {
  approach: 'ALB' | 'ELB' | 'CloudFront' | 'Other';
  healthChecks: string[];
  failover: string;
}

// 4. Event Processing Design
interface EventProcessingDesign {
  queue: 'SQS' | 'Kinesis' | 'RabbitMQ' | 'Other';
  retryStrategy: string;
  monitoring: string[];
}
```

**Evaluation Criteria**:
- [ ] Structured approach to system design
- [ ] Justifies technology choices with trade-offs
- [ ] Considers observability and monitoring
- [ ] Plans for horizontal scaling

---

## 🗄️ **Challenge 2: Database Design & Scaling (10 minutes)**

### **Scenario**: Design database for subscription platform with ACID requirements

**Instructions**:
1. Choose between PostgreSQL vs MongoDB
2. Design schema with proper relationships
3. Plan scaling strategy

**Expected Deliverables**:
```typescript
// 1. Database Choice Justification
interface DatabaseChoice {
  choice: 'PostgreSQL' | 'MongoDB';
  reasons: string[];
  acideCompliance: string;
  scalingStrategy: string;
}

// 2. Schema Design
interface SubscriptionSchema {
  users: {
    fields: string[];
    indexes: string[];
    constraints: string[];
  };
  subscriptions: {
    fields: string[];
    relationships: string[];
    indexes: string[];
  };
  products: {
    fields: string[];
    indexes: string[];
  };
}

// 3. Scaling Strategy
interface ScalingStrategy {
  readReplicas: number;
  shardingStrategy: string;
  cachingLayers: string[];
  backupStrategy: string;
}
```

**Evaluation Criteria**:
- [ ] Understands ACID properties
- [ ] Justifies database choice with specific use cases
- [ ] Designs proper indexes and relationships
- [ ] Plans for read/write separation

---

## ⚡ **Challenge 3: Concurrency & Race Condition Prevention (10 minutes)**

### **Scenario**: Prevent double-booking in limited subscription slots

**Instructions**:
1. Implement seat reservation with proper locking
2. Handle concurrent subscription creation
3. Ensure payment integrity

**Expected Deliverables**:
```typescript
// 1. Seat Reservation with Locking
async function reserveSeat(seatId: string, userId: string): Promise<ReservationResult> {
  // Implement proper concurrency control
  // Use database transactions or distributed locks
  // Handle timeouts and rollbacks
}

// 2. Concurrent Subscription Creation
async function createSubscriptionWithConcurrency(
  subscriptionData: CreateSubscriptionDto
): Promise<Subscription> {
  // Prevent race conditions
  // Handle stock reservation
  // Implement idempotency
}

// 3. Payment Idempotency
interface PaymentProcessor {
  processPayment(payment: PaymentData): Promise<PaymentResult>;
  handleWebhook(webhook: WebhookData): Promise<void>;
  retryFailedPayment(paymentId: string): Promise<void>;
}
```

**Evaluation Criteria**:
- [ ] Implements proper locking mechanisms
- [ ] Uses database transactions correctly
- [ ] Handles timeouts and rollbacks
- [ ] Implements idempotency for payments

---

## 🔄 **Challenge 4: Payment Flow & Event Processing (10 minutes)**

### **Scenario**: Design reliable payment processing with event sourcing

**Instructions**:
1. Design webhook handler with idempotency
2. Implement saga pattern for multi-step processes
3. Handle partial failures gracefully

**Expected Deliverables**:
```typescript
// 1. Idempotent Webhook Handler
@Post('/webhooks/payment')
async handlePaymentWebhook(@Body() webhook: PaymentWebhook) {
  // Implement idempotency
  // Handle duplicate webhooks
  // Process with retry logic
  // Use dead letter queue for failures
}

// 2. Saga Pattern Implementation
class SubscriptionSaga {
  async execute(subscriptionData: CreateSubscriptionDto): Promise<void> {
    // Implement saga pattern
    // Handle compensation on failures
    // Ensure eventual consistency
  }
}

// 3. Circuit Breaker Pattern
class PaymentService {
  async processPayment(payment: PaymentData): Promise<PaymentResult> {
    // Implement circuit breaker
    // Handle service failures
    // Implement fallback strategies
  }
}
```

**Evaluation Criteria**:
- [ ] Implements proper idempotency
- [ ] Uses saga pattern for complex workflows
- [ ] Handles partial failures gracefully
- [ ] Implements circuit breaker pattern

---

## 🏗️ **Challenge 5: NestJS Architecture & Best Practices (10 minutes)**

### **Scenario**: Structure large NestJS application for maintainability

**Instructions**:
1. Design modular architecture
2. Implement global error handling
3. Plan testing strategy

**Expected Deliverables**:
```typescript
// 1. Project Structure
interface NestJSArchitecture {
  modules: {
    shared: string[];
    features: string[];
    core: string[];
  };
  dependencyInjection: string[];
  interceptors: string[];
  guards: string[];
}

// 2. Global Error Handling
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Implement global error handling
    // Log errors appropriately
    // Return consistent error responses
  }
}

// 3. Testing Strategy
interface TestingStrategy {
  unitTests: string[];
  integrationTests: string[];
  e2eTests: string[];
  mockingStrategy: string;
}
```

**Evaluation Criteria**:
- [ ] Designs proper module structure
- [ ] Implements global error handling
- [ ] Plans comprehensive testing strategy
- [ ] Uses NestJS best practices

---

## ☁️ **Challenge 6: AWS Scalability & High Availability (5 minutes)**

### **Scenario**: Design AWS infrastructure for high availability

**Instructions**:
1. Design multi-AZ deployment
2. Plan auto-scaling strategy
3. Design disaster recovery

**Expected Deliverables**:
```typescript
// 1. AWS Architecture
interface AWSArchitecture {
  compute: {
    ec2: string[];
    lambda: string[];
    ecs: string[];
  };
  database: {
    rds: string[];
    dynamodb: string[];
    elasticache: string[];
  };
  networking: {
    vpc: string;
    subnets: string[];
    loadBalancer: string;
  };
  monitoring: string[];
}

// 2. Auto-scaling Configuration
interface AutoScalingConfig {
  triggers: string[];
  policies: string[];
  cooldown: number;
  healthChecks: string[];
}

// 3. Disaster Recovery Plan
interface DisasterRecoveryPlan {
  backupStrategy: string;
  rto: string; // Recovery Time Objective
  rpo: string; // Recovery Point Objective
  failoverProcedure: string[];
}
```

**Evaluation Criteria**:
- [ ] Designs multi-AZ deployment
- [ ] Plans auto-scaling for traffic spikes
- [ ] Implements proper monitoring
- [ ] Designs disaster recovery strategy

---

## 📊 **Scoring Rubric**

### **System Design (25 points)**
- Architecture Planning: 10 points
- Load Balancing: 5 points
- Microservices vs Monolith: 5 points
- Event Processing: 5 points

### **Database Reasoning (20 points)**
- Database Choice: 8 points
- ACID Understanding: 6 points
- Scaling Strategy: 6 points

### **Scalability & Availability (20 points)**
- AWS Architecture: 8 points
- Caching Strategy: 6 points
- High Availability: 6 points

### **Concurrency & Consistency (20 points)**
- Race Condition Prevention: 8 points
- Idempotency: 6 points
- Error Recovery: 6 points

### **NestJS Expertise (10 points)**
- Project Structure: 4 points
- Error Handling: 3 points
- Testing Strategy: 3 points

### **Communication (5 points)**
- Technical Explanation: 3 points
- Trade-off Analysis: 2 points

**Total: 100 points**

## 🚨 **Red Flags - Immediate Rejection**
- ❌ No concurrency handling
- ❌ No database justification
- ❌ No scalability consideration
- ❌ Poor NestJS structure
- ❌ Cannot explain choices
