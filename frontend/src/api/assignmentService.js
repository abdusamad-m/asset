import API from "./axiosConfig";

// GET
export const getAssignments = () => API.get("assignments/");

// CREATE
export const createAssignment = (data) =>
  API.post("assignments/", data);

// DELETE
export const deleteAssignment = (id) =>
  API.delete(`assignments/${id}/`);