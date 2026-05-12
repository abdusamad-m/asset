import API from "./axiosConfig";

export const loginUser = async (data) => {
  const res = await API.post("token/", data);

  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  return res.data;
};