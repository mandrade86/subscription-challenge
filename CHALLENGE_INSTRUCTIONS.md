# 🚀 Senior Fullstack Developer Assessment - Focus Areas

## 🎯 **Assessment Focus: 6 Key Screening Areas**

This assessment is designed to evaluate candidates on the specific areas where previous candidates have struggled:

### **1. System Design Depth** 
- Can they design scalable/resilient services without heavy guidance?
- Do they understand load balancing, microservices, async queues, observability?

### **2. Database Reasoning**
- Do they understand ACID, scaling strategies, SQL vs. NoSQL trade-offs?
- Can they justify database choices with specific use cases?

### **3. Scalability & Availability**
- Can they design for high load and HA in AWS?
- Do they understand horizontal scaling, caching, multi-AZ deployments?

### **4. Concurrency & Consistency**
- Can they prevent race conditions, ensure payment/booking integrity?
- Do they understand transactions, locking, idempotency?

### **5. NestJS Expertise**
- Beyond coding — do they know how to structure, test, and scale apps in Nest?
- Do they understand modules, DI, interceptors, guards, exception handling?

### **6. Communication**
- Can they explain design choices clearly in English?
- Do they justify technical decisions with trade-offs?

## 📋 **Initial Setup (5 minutes)**

### **1. Clone and Configure**
```bash
# The project is already created, you just need to:
cd subscription-challenge

# Backend
cd backend
npm install
cp env.example .env
# Edit .env with your configurations

# Frontend  
cd ../frontend
npm install
```

### **2. Start Services**
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm start

# Terminal 3 - MongoDB (if you don't have Docker)
mongod
```

## 🎯 **Assessment Tasks (55 minutes)**

### **Phase 1: System Design & Architecture (20 minutes)**

#### **Challenge 1: Scalable Subscription Service Design (10 min)**
- [ ] Design backend architecture for 1M monthly users
- [ ] Explain load balancing strategy
- [ ] Choose between microservices vs modular monolith
- [ ] Design async event processing for subscription renewals
- [ ] Plan observability and monitoring

#### **Challenge 2: Database Design & Scaling (10 min)**
- [ ] Choose between PostgreSQL vs MongoDB and justify
- [ ] Design schema for subscription data with ACID properties
- [ ] Plan database scaling beyond vertical scaling
- [ ] Design read/write separation strategy
- [ ] Plan caching strategy at multiple layers

### **Phase 2: Concurrency & Reliability (20 minutes)**

#### **Challenge 3: Race Condition Prevention (10 min)**
- [ ] Implement seat reservation for limited subscription slots
- [ ] Prevent double-booking with proper locking mechanisms
- [ ] Handle concurrent subscription creation
- [ ] Implement idempotency for payment processing
- [ ] Design retry mechanisms for external API calls

#### **Challenge 4: Payment Flow Integrity (10 min)**
- [ ] Design webhook handler with idempotency
- [ ] Implement saga pattern for multi-step subscription process
- [ ] Handle partial failures gracefully
- [ ] Design dead letter queue for failed messages
- [ ] Implement circuit breaker pattern

### **Phase 3: NestJS Architecture & Implementation (15 minutes)**

#### **Challenge 5: NestJS Best Practices (10 min)**
- [ ] Structure large NestJS project with feature modules
- [ ] Implement global error handling and logging
- [ ] Design dependency injection strategy
- [ ] Implement interceptors and guards
- [ ] Plan testing strategy (unit, integration, e2e)

#### **Challenge 6: AWS Scalability (5 min)**
- [ ] Design multi-AZ deployment strategy
- [ ] Plan auto-scaling for traffic spikes
- [ ] Design failover and disaster recovery
- [ ] Plan data backup and recovery strategy

## 📝 **Provided Base Code**

### **Backend - Structure**
```
backend/
├── src/
│   ├── main.ts              ✅ Configured
│   ├── app.module.ts        ✅ Configured
│   └── modules/             📝 TODO: Create modules
│       ├── auth/
│       ├── users/
│       ├── products/
│       └── subscriptions/
├── package.json             ✅ Configured
└── env.example              ✅ Configured
```

### **Frontend - Structure**
```
frontend/
├── src/
│   ├── App.tsx              ✅ Configured
│   ├── index.tsx            ✅ Configured
│   └── components/          📝 TODO: Create components
│   └── pages/               📝 TODO: Create pages
│   └── contexts/            📝 TODO: Create contexts
├── package.json             ✅ Configured
└── public/index.html        ✅ Configured
```

## 🎯 **Evaluation Criteria - 6 Key Areas**

### **1. System Design Depth (25 points)**
- [ ] **Architecture Planning** (10 points): Can design scalable system without guidance
- [ ] **Load Balancing Strategy** (5 points): Understands horizontal scaling, load distribution
- [ ] **Microservices vs Monolith** (5 points): Can justify choice with trade-offs
- [ ] **Event Processing** (5 points): Designs async processing for subscription events

### **2. Database Reasoning (20 points)**
- [ ] **Database Choice Justification** (8 points): PostgreSQL vs MongoDB with specific use cases
- [ ] **ACID Understanding** (6 points): Demonstrates knowledge of transactions, consistency
- [ ] **Scaling Strategy** (6 points): Read/write separation, sharding, replication

### **3. Scalability & Availability (20 points)**
- [ ] **AWS Architecture** (8 points): Multi-AZ, auto-scaling, failover strategies
- [ ] **Caching Strategy** (6 points): Multiple layers, invalidation, performance
- [ ] **High Availability** (6 points): Disaster recovery, backup strategies

### **4. Concurrency & Consistency (20 points)**
- [ ] **Race Condition Prevention** (8 points): Proper locking, transactions
- [ ] **Idempotency Implementation** (6 points): Payment processing, webhook handling
- [ ] **Error Recovery** (6 points): Retry mechanisms, circuit breakers

### **5. NestJS Expertise (10 points)**
- [ ] **Project Structure** (4 points): Feature modules, dependency injection
- [ ] **Error Handling** (3 points): Global exception filters, logging
- [ ] **Testing Strategy** (3 points): Unit, integration, e2e testing

### **6. Communication (5 points)**
- [ ] **Technical Explanation** (3 points): Clear explanation of design choices
- [ ] **Trade-off Analysis** (2 points): Justifies decisions with pros/cons

## 🚨 **Red Flags - Immediate Rejection**
- ❌ **No concurrency handling** - Will fail in production
- ❌ **No database justification** - Shows lack of depth
- ❌ **No scalability consideration** - Cannot handle growth
- ❌ **Poor NestJS structure** - Lacks framework expertise
- ❌ **Cannot explain choices** - Communication issues

## 🚀 **Expected Endpoints**

### **Authentication**
```typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
```

### **Products**
```typescript
GET /api/products
GET /api/products/:id
POST /api/products (admin)
PUT /api/products/:id (admin)
```

### **Subscriptions**
```typescript
GET /api/subscriptions
POST /api/subscriptions
PUT /api/subscriptions/:id
POST /api/subscriptions/:id/pause
POST /api/subscriptions/:id/cancel
```

## 📊 **Scoring**

- **90-100**: Excellent - Exceptional Senior
- **80-89**: Very Good - Solid Senior  
- **70-79**: Good - Competent Senior
- **60-69**: Acceptable - With potential
- **<60**: Not recommended

## ⚠️ **Important Tips**

1. **Functionality > Perfection**: It's better to have something that works at 80% than something perfect at 0%
2. **Prioritize**: Authentication → CRUD → UI → Optimizations
3. **Debugging**: Use console.log and dev tools
4. **Time Management**: 30min backend, 25min frontend, 5min optimization
5. **Communicate**: Explain your technical decisions

## 🎯 **Follow-up Questions**

At the end of the challenge, be prepared to explain:
- What technical decisions did you make and why?
- How would you scale this system?
- What optimizations would you implement with more time?
- How would you handle errors in production?

---

**Good luck! Remember: the goal is to demonstrate senior skills, not to create a perfect product.**
