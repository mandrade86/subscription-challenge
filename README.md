# 🚀 Live Coding Challenge - Sistema de Suscripciones

## 📋 **Instrucciones para el Candidato**

Tienes **1 hora** para crear un sistema de gestión de suscripciones desde cero. Este challenge evalúa tus habilidades como **Senior Fullstack Developer**.

## 🎯 **Objetivos del Challenge**

### **Backend (30 minutos)**
- [ ] **API RESTful** con NestJS + TypeScript
- [ ] **Base de datos** con MongoDB
- [ ] **Autenticación JWT** con refresh tokens
- [ ] **Validaciones** robustas
- [ ] **Manejo de errores** centralizado

### **Frontend (25 minutos)**
- [ ] **React + TypeScript** con hooks modernos
- [ ] **UI responsiva** con Material-UI
- [ ] **State management** eficiente
- [ ] **Formularios** con validación
- [ ] **Loading states** y error handling

### **Optimización (5 minutos)**
- [ ] **Database indexing** estratégico
- [ ] **API caching** básico
- [ ] **Frontend optimization**

## 🏗️ **Entidades del Sistema**

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

## 🚀 **Setup Inicial**

### **Backend**
```bash
# Crear proyecto NestJS
npm i -g @nestjs/cli
nest new backend
cd backend

# Instalar dependencias
npm install @nestjs/mongoose mongoose
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install class-validator class-transformer
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### **Frontend**
```bash
# Crear proyecto React
npx create-react-app frontend --template typescript
cd frontend

# Instalar dependencias
npm install @mui/material @emotion/react @emotion/styled
npm install axios react-router-dom
npm install @types/react-router-dom
```

## 📝 **Endpoints Requeridos**

### **Autenticación**
- `POST /auth/login` - Login
- `POST /auth/register` - Registro
- `POST /auth/refresh` - Refresh token

### **Productos**
- `GET /products` - Lista paginada
- `GET /products/:id` - Detalle
- `POST /products` - Crear (admin)
- `PUT /products/:id` - Actualizar (admin)

### **Suscripciones**
- `GET /subscriptions` - Mis suscripciones
- `POST /subscriptions` - Crear suscripción
- `PUT /subscriptions/:id` - Actualizar
- `POST /subscriptions/:id/pause` - Pausar
- `POST /subscriptions/:id/cancel` - Cancelar

## 🎨 **Páginas Frontend**

1. **Login/Register** - Autenticación
2. **Dashboard** - Resumen
3. **Products** - Catálogo
4. **My Subscriptions** - Gestión
5. **Admin Panel** - Gestión productos (admin)

## ⚡ **Criterios de Evaluación**

- **Código (40%)**: Arquitectura, TypeScript, Clean Code
- **Backend (30%)**: API Design, Database, Security
- **Frontend (20%)**: UI/UX, State Management, Performance
- **Optimización (10%)**: Indexing, Caching, Performance

## 🎯 **Puntos Bonus**

- WebSockets para notificaciones
- Tests unitarios
- Docker
- CI/CD pipeline
- Monitoring

---

**¡Buena suerte! Recuerda: funcionalidad > perfección.**
