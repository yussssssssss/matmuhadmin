import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminLayout from './components/layout/AdminLayout';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/AdminDashboard';
import Announcements from './pages/Announcements';
import Researches from './pages/Researches';
import Projects from './pages/Projects';
import Lectures from './pages/Lectures';
import Settings from './pages/Settings';
import Users from './pages/Users'; // Kullanıcılar bileşenini import ediyoruz
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Giriş Sayfası */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Paneli */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              {/* Ana Dashboard */}
              <Route index element={<Dashboard />} />

              {/* Alt Sayfalar */}
              <Route path="announcements" element={<Announcements />} />
              <Route path="researches" element={<Researches />} />
              <Route path="projects" element={<Projects />} />
              <Route path="lectures" element={<Lectures />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} /> {/* Kullanıcı Yönetim Sayfası */}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
