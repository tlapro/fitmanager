/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUpdateDataForm } from "@/app/(Dashboard)/dashboard/user/data/updatedata/UpdateData";
import axios from "axios";

export const putUpdateData = async (id: string, form: IUpdateDataForm) => {
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
		console.error("Error en la solicitud PUT:", error);
		throw error.response ? error.response.data : error;
	}
};
