# 🚀 Live Coding Challenge - Subscription System

## 📋 **Instructions for the Candidate**

You have **1 hour** to create a subscription management system from scratch. This challenge evaluates your skills as a **Senior Fullstack Developer**.

## 🎯 **Challenge Objectives**

### **Backend (30 minutes)**
- [ ] **RESTful API** with NestJS + TypeScript
- [ ] **Database** with MongoDB
- [ ] **JWT Authentication** with refresh tokens
- [ ] **Robust validations**
- [ ] **Centralized error handling**

### **Frontend (25 minutes)**
- [ ] **React + TypeScript** with modern hooks
- [ ] **Responsive UI** with Material-UI
- [ ] **Efficient state management**
- [ ] **Forms** with validation
- [ ] **Loading states** and error handling

### **Optimization (5 minutes)**
- [ ] **Strategic database indexing**
- [ ] **Basic API caching**
- [ ] **Frontend optimization**

## 🏗️ **System Entities**

### **User**
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLoginAt: Date;
}
```

### **Product**
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isActive: boolean;
  stock: number;
  tags: string[];
}
```

### **Subscription**
```typescript
interface Subscription {
  id: string;
  userId: string;
  productId: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  type: 'monthly' | 'yearly' | 'trial';
  startDate: Date;
  endDate: Date;
  nextBillingDate: Date;
  autoRenew: boolean;
  price: number;
}
```

## 🚀 **Initial Setup**

### **Backend**
```bash
# Create NestJS project
npm i -g @nestjs/cli
nest new backend
cd backend

# Install dependencies
npm install @nestjs/mongoose mongoose
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install class-validator class-transformer
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### **Frontend**
```bash
# Create React project
npx create-react-app frontend --template typescript
cd frontend

# Install dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install axios react-router-dom
npm install @types/react-router-dom
```

## 📝 **Required Endpoints**

### **Authentication**
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `POST /auth/refresh` - Refresh token

### **Products**
- `GET /products` - Paginated list
- `GET /products/:id` - Details
- `POST /products` - Create (admin)
- `PUT /products/:id` - Update (admin)

### **Subscriptions**
- `GET /subscriptions` - My subscriptions
- `POST /subscriptions` - Create subscription
- `PUT /subscriptions/:id` - Update
- `POST /subscriptions/:id/pause` - Pause
- `POST /subscriptions/:id/cancel` - Cancel

## 🎨 **Frontend Pages**

1. **Login/Register** - Authentication
2. **Dashboard** - Summary
3. **Products** - Catalog
4. **My Subscriptions** - Management
5. **Admin Panel** - Product management (admin)

## ⚡ **Evaluation Criteria**

- **Code (40%)**: Architecture, TypeScript, Clean Code
- **Backend (30%)**: API Design, Database, Security
- **Frontend (20%)**: UI/UX, State Management, Performance
- **Optimization (10%)**: Indexing, Caching, Performance

## 🎯 **Bonus Points**

- WebSockets for notifications
- Unit tests
- Docker
- CI/CD pipeline
- Monitoring

---

**Good luck! Remember: functionality > perfection.**
