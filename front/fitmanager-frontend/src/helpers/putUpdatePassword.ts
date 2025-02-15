/* eslint-disable @typescript-eslint/no-explicit-any */

import { IChangePassword } from "@/app/(Dashboard)/dashboard/user/data/update-password/UpdatePassword";
import axios from "axios";

export const putUpdatePassword = async (id: string, form: IChangePassword) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token no encontrado.");
        return;
      }  
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-personal/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.user;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  };
  