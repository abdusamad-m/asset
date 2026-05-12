import API from "./axiosConfig";

export const getInventory = () => API.get("inventory/");
export const createInventory = (data) => API.post("inventory/", data);
export const deleteInventory = (id) => API.delete(`inventory/${id}/`);