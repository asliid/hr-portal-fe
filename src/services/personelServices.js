
import axiosInstance from '../core/axiosInstance';

export const getPersonel = () => {
  return axiosInstance.get("/personel");
};


export const createPersonel = (personelData) => {
    return axiosInstance.post("/personel", personelData);
};
export const deletePersonel = (personelSicilNo) => {
  return axiosInstance.delete(`/personel/${personelSicilNo}/delete`);
};
