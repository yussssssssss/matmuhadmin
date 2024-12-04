import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAuthenticatedUser, changePassword } from '../services/UserService';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const Settings: React.FC = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Kullanıcı bilgilerini almak için API çağrısı
    const fetchUser = async () => {
      try {
        const response = await getAuthenticatedUser();
        if (response.success) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Kullanıcı bilgileri yüklenirken hata oluştu:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Yeni şifreler eşleşmiyor. Lütfen tekrar kontrol edin.');
      return;
    }

    try {
      const response = await changePassword(oldPassword, newPassword);
      if (response.success) {
        alert('Şifre başarıyla değiştirildi.');
        resetPasswordForm();
      }
    } catch (error) {
      console.error('Şifre değiştirilirken hata oluştu:', error);
      alert('Şifre değiştirilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const resetPasswordForm = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ayarlar</h1>
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Kullanıcı Bilgileri</h2>
          <p><strong>Ad:</strong> {user.firstName}</p>
          <p><strong>Soyad:</strong> {user.lastName}</p>
          <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
          <p><strong>E-posta:</strong> {user.email}</p>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Şifre Değiştir</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Eski Şifre</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Yeni Şifre</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Yeni Şifre (Tekrar)</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
            Şifreyi Değiştir
          </button>
        </form>
        <div className="mt-8">
          <button onClick={logout} className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
