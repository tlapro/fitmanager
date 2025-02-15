/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

export const uploadProfilePicture = async (id: string, file: File) => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("Token no encontrado.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/user/${id}/profile-picture`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return response.data;
	} catch (error: any) {
		console.error("Error en la solicitud POST:", error);
		throw error.response ? error.response.data : error;
	}
};