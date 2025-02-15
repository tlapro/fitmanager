
import { IUser } from "@/interfaces/IUser";
import axios from "axios";

export const getUserProfile = async (id: string): Promise<IUser | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch {
    return null;
  }
};
