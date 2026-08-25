import axios from 'axios';

// Automatically uses localhost in dev, and relative '/api' on Vercel/Production
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Response interceptor for streamlined data extraction and error resilience
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'API request error';
    console.warn('API Error:', message);
    return Promise.reject(error.response?.data || { success: false, message });
  }
);

// Wish API calls
export const fetchWishes = async (params = {}) => {
  return await api.get('/wishes', { params });
};

export const submitWish = async (wishData) => {
  return await api.post('/wishes', wishData);
};

export const likeWishApi = async (id) => {
  return await api.post(`/wishes/${id}/like`);
};

// Message / Contact API calls
export const submitContactMessage = async (messageData) => {
  return await api.post('/messages', messageData);
};

// Gallery API calls
export const fetchGallery = async (category = 'all') => {
  return await api.get('/gallery', { params: { category } });
};

export const likeGalleryApi = async (id) => {
  return await api.post(`/gallery/${id}/like`);
};

// Custom Rakhi API calls
export const saveCustomRakhi = async (rakhiData) => {
  return await api.post('/rakhis', rakhiData);
};

export const fetchCustomRakhis = async () => {
  return await api.get('/rakhis');
};

export default api;
