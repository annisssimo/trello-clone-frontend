import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAllBoards = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/boards`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
