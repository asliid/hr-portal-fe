
import axiosInstance from '../core/axiosInstance';

export const getAllZimmet = () => {
  return axiosInstance.get("/zimmet/zimmetler");
};


export const createZimmet = (zimmetData) => {
    return axiosInstance.post('/zimmet/create', zimmetData);
};


export const geriAlZimmet = (zimmetId) => {
  return axiosInstance.put(`/zimmet/${zimmetId}/geri-al`);
};

// Güncelleme işlemini gerçekleştirecek fonksiyon
export const updateZimmet = (zimmetData) => {
  return axiosInstance.put('/zimmet/update', zimmetData);
};

export const filterPersonel = (personelSicilNo, personelName) => {
  return axiosInstance.get("/zimmet/envanterAlanPersonel", {
    params: { personelSicilNo, personelName }
  });
};

export const getAvailableEnvanter = () => {
  return axiosInstance.get("/zimmet/depo");
};

export const getZimmetlerByPersonel = (personelSicilNo) => {
  return axiosInstance.get(`/zimmet/personel/${personelSicilNo}/zimmet`);
};