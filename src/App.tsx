import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { CountrySelection } from './components/CountrySelection';
import { PromotionsPage } from './pages/PromotionsPage';
import { PromotionDetailsPage } from './pages/PromotionDetailsPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPromotionEdit } from './pages/admin/AdminPromotionEdit';
import { PromotionsProvider } from './contexts/PromotionsContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <PromotionsProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-wave-light">
            <Header />
            <Routes>
              <Route path="/" element={<CountrySelection />} />
              <Route path="/:countryCode" element={<PromotionsPage />} />
              <Route path="/:countryCode/promotions/:promotionId" element={<PromotionDetailsPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/promotions/new" element={
                <ProtectedRoute>
                  <AdminPromotionEdit />
                </ProtectedRoute>
              } />
              <Route path="/admin/promotions/:id/edit" element={
                <ProtectedRoute>
                  <AdminPromotionEdit />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PromotionsProvider>
    </AuthProvider>
  );
}

export default App;