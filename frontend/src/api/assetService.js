import API from './axiosConfig'

export const getAssets = () => API.get("assets/");
export const createAsset = (data) => API.post("assets/", data);
export const deleteAsset = (id) => API.delete(`assets/${id}/`);