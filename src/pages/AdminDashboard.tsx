import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuthenticatedUser } from '../services/UserService';

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAuthenticatedUser();
        if (response.success && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Kullanıcı bilgileri yüklenirken hata oluştu:', error);
      }
    };
    
    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Admin Paneli Başlığı */}
      <h1 className="text-2xl font-bold mb-4 text-white">Yıldız Teknik Üniversitesi Matematik Mühendisliği Topluluğu Yönetim Paneli</h1>
      
      {/* Hoşgeldiniz Mesajı */}
      {user && (
        <p className="text-lg mb-6 text-white">
          Hoş geldiniz, <span className="font-semibold text-white">{user.firstName} {user.lastName}</span>!
        </p>
      )}
      
      {/* Panel Linkleri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/announcements" className="block bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200">
          <h2 className="text-lg font-bold">Duyurular</h2>
          <p className="text-sm text-gray-600">Tüm duyuruları yönetin.</p>
        </Link>
        <Link to="/admin/researches" className="block bg-green-100 p-4 rounded-lg shadow hover:bg-green-200">
          <h2 className="text-lg font-bold">Araştırmalar</h2>
          <p className="text-sm text-gray-600">Araştırma içeriklerini düzenleyin.</p>
        </Link>
        <Link to="/admin/projects" className="block bg-purple-100 p-4 rounded-lg shadow hover:bg-purple-200">
          <h2 className="text-lg font-bold">Projeler</h2>
          <p className="text-sm text-gray-600">Proje yönetim paneli.</p>
        </Link>
        <Link to="/admin/users" className="block bg-yellow-100 p-4 rounded-lg shadow hover:bg-yellow-200">
          <h2 className="text-lg font-bold">Kullanıcılar</h2>
          <p className="text-sm text-gray-600">Kullanıcı yönetimi yapın.</p>
        </Link>
        <Link to="/admin/lectures" className="block bg-red-100 p-4 rounded-lg shadow hover:bg-red-200">
          <h2 className="text-lg font-bold">Dersler</h2>
          <p className="text-sm text-gray-600">Ders yönetim paneli.</p>
        </Link>
        <Link to="/admin/settings" className="block bg-teal-100 p-4 rounded-lg shadow hover:bg-teal-200">
          <h2 className="text-lg font-bold">Ayarlar</h2>
          <p className="text-sm text-gray-600">Panel ayarlarını düzenleyin.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
