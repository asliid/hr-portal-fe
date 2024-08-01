import axiosInstance from '../core/axiosInstance';


export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', {
            username,
            password
        });
        return response.data; // AuthResponseDto'yu döndürür
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred');
    }
};
export const register = async (username, password) => {
    try {
        const response = await axiosInstance.post('/api/auth/register', {
            username,
            password
        });
        return response.data; // Başarı mesajını veya diğer dönen verileri döndürür
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred');
    }
};