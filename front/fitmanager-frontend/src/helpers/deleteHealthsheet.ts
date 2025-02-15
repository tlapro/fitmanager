/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const deleteHealthsheet = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/healthsheet/${id}`,
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
