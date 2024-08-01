
import axiosInstance from '../core/axiosInstance';

export const getUsers = () => {
  return axiosInstance.get("/users");
};


export const addUsersItem = (usersData) => {
    return axiosInstance.post('/users', usersData);
};
