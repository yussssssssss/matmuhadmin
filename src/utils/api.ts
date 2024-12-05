import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://api.matmuh.yildizskylab.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Cookie gönderimi için gerekli
});

api.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('authToken='))
      ?.split('=')[1];
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error('İstek gönderilemedi, lütfen tekrar deneyin.');
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.isSuccess === false) {
      toast.error(response.data.message || 'Bir hata oluştu.');
    } else if (response.data && response.data.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // Response var ama statüsü hatalı ise
      switch (error.response.status) {
        case 401:
          // 401 Durumu için kullanıcıyı giriş sayfasına yönlendir
          window.location.href = '/login';
          break;
        case 403:
          // 403 Durumu için yetki hatası mesajı göster
          const errorMessage =
            error.response.data?.message || 'Bu işlemi yapmaya yetkiniz yok.';
          toast.error(errorMessage);
          break;
        default:
          // Diğer hataları yakala ve bildirimi göster
          toast.error(
            error.response.data?.message ||
              `Bir hata oluştu: ${error.response.status} ${error.response.statusText}`
          );
      }
    } else if (error.request) {
      // Response yoksa ama request yapılmışsa (sunucuya ulaşılamıyorsa)
      toast.error('Sunucuya ulaşılamıyor, lütfen bağlantınızı kontrol edin.');
    } else {
      // Diğer hatalar (request gönderilememiş olabilir)
      toast.error('Bir hata oluştu, lütfen tekrar deneyin.');
    }
    return Promise.reject(error);
  }
);

export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Fetch Data Error:', error);
    throw error;
  }
};

export const postData = async (endpoint: string, data: any, isMultipart = false) => {
  try {
    const config = {
      headers: isMultipart
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' },
    };
    const response = await api.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error('Post Data Error:', error);
    throw error;
  }
};

export const putData = async (endpoint: string, data: any, isMultipart = false) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Put Data Error:', error);
    throw error;
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Delete Data Error:', error);
    throw error;
  }
};
