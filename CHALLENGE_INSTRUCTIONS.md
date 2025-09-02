# 🚀 Live Coding Challenge - Detailed Instructions

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

## 🎯 **Specific Tasks (55 minutes)**

### **Backend Tasks (30 minutes)**

#### **1. Database Setup (5 min)**
- [ ] Create schemas for User, Product, Subscription
- [ ] Configure MongoDB connection
- [ ] Create basic indexes

#### **2. Authentication (10 min)**
- [ ] Implement JWT strategy
- [ ] Create AuthModule with login/register
- [ ] Add guards for protected routes
- [ ] Implement refresh tokens

#### **3. Business Modules (15 min)**
- [ ] ProductsModule: Basic CRUD
- [ ] SubscriptionsModule: CRUD + states
- [ ] Validations with class-validator
- [ ] Centralized error handling

### **Frontend Tasks (25 minutes)**

#### **1. Base Configuration (5 min)**
- [ ] Configure routing with React Router
- [ ] Create AuthContext for global state
- [ ] Configure axios for API calls

#### **2. Main Pages (15 min)**
- [ ] Login/Register pages
- [ ] Dashboard with summary
- [ ] Products page with list
- [ ] Subscriptions page with management

#### **3. Components and UX (5 min)**
- [ ] Loading states
- [ ] Error handling
- [ ] Forms with validation
- [ ] Basic responsive design

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

## 🎯 **Evaluation Criteria**

### **Must Have (Pass/Fail)**
- [ ] **Working Authentication**: Login/Register
- [ ] **Basic CRUD**: Products and Subscriptions
- [ ] **Connected Frontend**: API calls working
- [ ] **Navigation**: Basic routes working

### **Should Have (Extra points)**
- [ ] **Validations**: Backend and frontend
- [ ] **Error handling**: Try-catch, error boundaries
- [ ] **Responsive UI**: Material-UI well implemented
- [ ] **Loading states**: Loading spinners

### **Nice to Have (Bonus)**
- [ ] **Optimizations**: DB indexes, caching
- [ ] **Basic tests**: Unit tests
- [ ] **Documentation**: Updated README
- [ ] **Docker**: Containerization

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
