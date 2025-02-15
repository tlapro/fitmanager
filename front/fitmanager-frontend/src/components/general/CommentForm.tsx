/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { Toast } from "@/components/Toast/Toast";

export const CommentForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
	const { user } = useAuth();
	const userId = user?.id_user;

	const [content, setContent] = useState("");
	const [rating, setRating] = useState<number>(5);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		if (!token) {
			alert("Debes iniciar sesión para enviar un comentario");
			return;
		}

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/comments/${userId}`,
				{
					content,
					rating,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.data) throw new Error("Error al enviar comentario");
			Toast.fire({ icon: "success", title: "Comentario agregado exitosamente." });
			setContent("");
			setRating(5);
			onSuccess();
		} catch (error: any) {
			console.error("Error:", error);
			if (error.response?.status === 401) {
				alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
				window.location.href = "/login";
			} else {
				alert(error.response?.data?.message || "Error al enviar el comentario");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12 p-6 bg-gray-50 rounded-lg shadow-sm">
			<h3 className="text-xl font-semibold mb-4">Deja tu comentario</h3>

			<div className="mb-4">
				<label className="block text-sm font-medium mb-2">Comentario</label>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full p-3 border rounded-md"
					rows={3}
					required
				/>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium mb-2">Calificación</label>
				<select
					value={rating}
					onChange={(e) => setRating(parseInt(e.target.value))}
					className="w-full p-2 border rounded-md"
					required
				>
					<option value={5}>5 Estrellas</option>
					<option value={4.5}>4.5 Estrellas</option>
					<option value={4}>4 Estrellas</option>
					<option value={3.5}>3.5 Estrellas</option>
					<option value={3}>3 Estrellas</option>
				</select>
			</div>

			<button
				type="submit"
				className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
			>
				Enviar Comentario
			</button>
		</form>
	);
};