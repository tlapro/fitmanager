import { IUser } from "@/interfaces/IUser";
import axios from "axios";

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
};
