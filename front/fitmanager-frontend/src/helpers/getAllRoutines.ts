/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getAllRoutines = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/catalogo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};
