import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('authToken='))
    ?.split('=')[1];

  if (!token) {
    return false;
  }

  try {
    const user = JSON.parse(atob(token.split('.')[1])); // JWT'nin payload kısmını parse et

    // Tokenin geçerli olup olmadığını kontrol etmek (örneğin expiration süresi)
    const currentTime = Math.floor(Date.now() / 1000); // Şu anki zaman (saniye olarak)
    if (user.exp && currentTime > user.exp) {
      return false; // Token süresi dolmuş
    }

    // Kullanıcının yetkili olup olmadığını kontrol et (sadece admin girebilsin)
    return user.authorities && user.authorities.includes('ROLE_ADMIN');
  } catch (error) {
    console.error('JWT parse error:', error);
    return false; // Eğer token geçerli değilse veya parse edilemediyse yetkisiz kabul edilsin
  }
};

const PrivateRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
