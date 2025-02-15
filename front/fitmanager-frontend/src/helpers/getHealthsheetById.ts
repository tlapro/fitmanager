/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getHealthsheetById = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/healthsheet/user/${id}`,
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
