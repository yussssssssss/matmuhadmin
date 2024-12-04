import React, { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser } from '../services/UserService';
import { register } from '../services/AuthService';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  authorities: string[];
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authorities, setAuthorities] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (response.success && Array.isArray(response.data)) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Kullanıcılar yüklenirken hata oluştu:', error);
    }
  };

  const handleSubmit = async () => {
    const user = { firstName, lastName, username, email, password, authorities };

    try {
      if (editingId) {
        await updateUser(editingId, user);
      } else {
        await register(user);
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Kullanıcı eklenirken hata oluştu:', error);
    }
  };

  const handleEdit = (user: User) => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsername(user.username);
    setEmail(user.email);
    setAuthorities(user.authorities);
    setEditingId(user.id);
    setIsAddingNew(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Kullanıcı silinirken hata oluştu:', error);
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setAuthorities([]);
    setEditingId(null);
    setIsAddingNew(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Kullanıcılar Yönetimi</h1>

      {!isAddingNew ? (
        <div>
          <button
            className="mb-6 px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
            onClick={() => setIsAddingNew(true)}
          >
            Yeni Kullanıcı Ekle
          </button>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">Kullanıcı Adı: {user.username}</p>
                <p className="text-gray-600">E-posta: {user.email}</p>
                <p className="text-gray-600">Roller: {user.authorities.join(', ')}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(user)}
                  >
                    Düzenle
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(user.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="bg-white p-6 rounded shadow-md mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Adı</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={!editingId} // Yeni kullanıcı eklenirken zorunlu, güncellemede isteğe bağlı
          />
          {editingId && (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-2">Roller</label>
              <select
                multiple
                value={authorities}
                onChange={(e) =>
                  setAuthorities(Array.from(e.target.selectedOptions, (option) => option.value))
                }
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                <option value="ROLE_USER">ROLE_USER</option>
              </select>
            </>
          )}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              {editingId ? 'Güncelle' : 'Ekle'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500"
            >
              Vazgeç
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Users;
