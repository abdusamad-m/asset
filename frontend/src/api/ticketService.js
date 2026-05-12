import API from "./axiosConfig";

// GET tickets
export const getTickets = () => API.get("tickets/");

// CREATE ticket
export const createTicket = (data) => API.post("tickets/", data);

// DELETE ticket
export const deleteTicket = (id) => API.delete(`tickets/${id}/`);