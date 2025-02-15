"use client";
import { Toast } from "@/components/Toast/Toast";
import ToastConditional from "@/components/ToastConditional/ToastConditional";
import { useAuth } from "@/context/AuthContext";
import { putUpdateData } from "@/helpers/putUpdateData";
import { validateFormData, ValidationUserErrors } from "@/helpers/validateFormData";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export interface IUpdateDataForm {
	name: string;
	birthdate: string;
	phone: string;
	address: string;
	city: string;
	country: string;
}

export default function UpdateData() {
	const router = useRouter();
	const { user, setUser } = useAuth();
	const [formData, setFormData] = useState<IUpdateDataForm>({
		name: "",
		birthdate: "",
		phone: "",
		address: "",
		city: "",
		country: "",
	});

	const [errors, setErrors] = useState<ValidationUserErrors>({});

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || "",
				birthdate: user.birthdate || "",
				phone: user.phone || "",
				address: user.address || "",
				city: user.city || "",
				country: user.country || "",
			});
		}
	}, [user]);


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: undefined,
		}));
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user) {
			throw new Error("No se encontró el usuario en la sesión.");
		}

		const validationErrors = validateFormData(formData);
		setErrors(validationErrors);


		if (Object.keys(validationErrors).length > 0) {
			return;
		}
		const messages = {
			title: "¿Estás seguro?",
			text: "¿Deseas actualizar tus datos?",
			confirmButtonText: "Sí, actualizar",
			cancelButtonText: "Cancelar",
			confirmButtonColor: "black",
		};

		const confirmUpdate = await ToastConditional(messages);
		if (!confirmUpdate) return;

		try {
			const newUserData = await putUpdateData(user?.id_user, formData);
			Toast.fire({ icon: "success", title: "Datos actualizados con éxito." });
			router.push("/dashboard/user/data");
			setUser(newUserData);
			localStorage.setItem('user', JSON.stringify(newUserData));
		} catch (error) {
			console.error("Error al actualizar los datos:", error);
		}
	};

	return (
		<div className="p-6 w-full">
			<h1 className="text-2xl font-bold mb-6 text-center">
				Actualizar Datos de Usuario
			</h1>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				{[
					{
						label: "Nombre y Apellido",
						name: "name",
						type: "text",
						placeholder: "Ingresa tu nombre completo",
					},
					{
						label: "Fecha de Nacimiento",
						name: "birthdate",
						type: "date",
						placeholder: "",
					},
					{
						label: "Teléfono",
						name: "phone",
						type: "text",
						placeholder: "Ingresa un teléfono",
					},
					{
						label: "Dirección",
						name: "address",
						type: "text",
						placeholder: "Ingresa una dirección",
					},
					{
						label: "Ciudad",
						name: "city",
						type: "text",
						placeholder: "Ingresa una ciudad",
					},
					{
						label: "País",
						name: "country",
						type: "text",
						placeholder: "Ingresa un país",
					},
				].map(({ label, name, type, placeholder }) => (
					<div key={name} className="mb-4">
						<label
							htmlFor={name}
							className="block text-sm font-medium text-gray-700"
						>
							{label}
						</label>
						<input
							type={type}
							id={name}
							name={name}
							value={formData[name as keyof IUpdateDataForm]}
							onChange={handleChange}
							autoComplete="off"
							placeholder={placeholder}
							className={`mt-1 w-full px-4 py-2 border ${errors[name] ? "border-red-500" : "border-gray-300"
								} rounded-md focus:outline-none focus:ring focus:ring-indigo-300`}
						/>
						{errors[name] && (
							<p className="text-red-500 text-sm">{errors[name]}</p>
						)}
					</div>
				))}

				<div className="col-span-full flex justify-center mt-6">
					<button
						type="submit"
						className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 ease focus:outline-none focus:ring focus:ring-indigo-300"
					>
						Actualizar Datos
					</button>
				</div>
			</form>
		</div>
	);
}
