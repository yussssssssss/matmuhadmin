import { fetchData, postData, putData, deleteData } from '../utils/api.ts';

// Kullanıcıları listeleme (tüm kullanıcıları getirme)
export const getUsers = async () => fetchData('/users/getUsers');


// Kullanıcı bilgilerini güncelleme
export const updateUser = async (id: string, data: any) =>
  putData(`/users/updateUserById/${id}`, data);

// Kullanıcıyı silme
export const deleteUser = async (id: string) =>
  deleteData(`/users/deleteUserById/${id}`);

// Şu anki kullanıcıyı getirme (authenticated)
export const getAuthenticatedUser = async () =>
  fetchData('/users/getAuthenticatedUser');

// Şifre değiştirme (authenticated kullanıcı için)
export const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const data = {
        oldPassword,
        newPassword,
      };
      const response = await postData('/users/changeAuthenticatedUserPassword', data);
      return response;
    } catch (error) {
      console.error('Change Password Error:', error);
      throw error;
    }
  };
