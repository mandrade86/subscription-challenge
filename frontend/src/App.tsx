import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// TODO: Import your components here
// import { AuthProvider } from './contexts/AuthContext';
// import { Layout } from './components/Layout';
// import { Login } from './pages/Login';
// import { Register } from './pages/Register';
// import { Dashboard } from './pages/Dashboard';
// import { Products } from './pages/Products';
// import { Subscriptions } from './pages/Subscriptions';
// import { AdminPanel } from './pages/AdminPanel';
// import { ProtectedRoute } from './components/ProtectedRoute';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* TODO: Add your routes here */}
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/products" element={
              <ProtectedRoute>
                <Layout>
                  <Products />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/subscriptions" element={
              <ProtectedRoute>
                <Layout>
                  <Subscriptions />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <Layout>
                  <AdminPanel />
                </Layout>
              </ProtectedRoute>
            } />
            */}
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
