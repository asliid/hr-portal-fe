

import axiosInstance from '../core/axiosInstance';

export const getEnvanter = () => {
  return axiosInstance.get(`/envanter`);
};


export const createEnvanter = (envanterData) => {
    return axiosInstance.post('/envanter', envanterData);
};

export const deleteEnvanter = (envanterSeriNo) => {
  return axiosInstance.delete(`/envanter/${envanterSeriNo}/delete`);
};
