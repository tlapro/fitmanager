/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile } from "@/helpers/getUserProfile";
import axios from "axios";

export default function SuccessPaymentStripePage() {
	  const { user } = useAuth();

	  useEffect(() => {
		if (user) {
		  const fetchData = async () => {
			const fetchedUser = await getUserProfile(user?.id_user);
			if (fetchedUser?.isActive === true) {
				localStorage.setItem("isActive", "true")
			} else {
				localStorage.setItem("isActive", "false")
			}
		  };
		  fetchData();
		}
		const activateUser = async () => {
			const token = localStorage.getItem("token"); 
			const userId = user?.id_user;
			if (!token || !userId) return;

			try {
				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/user/activate/${userId}`,
					{},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				console.log("Usuario activado:", response.data);
			} catch (error) {
				console.error("Error activando usuario", error);
			}
		};
		activateUser();
		}, [user]);
	return (
		<div className="w-full mt-40 h-auto flex justify-center">
			<motion.div
				className="container max-w-2xl  p-6 bg-white border-[1px] border-gray-100 rounded-2xl shadow-2xl text-center"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 100 }}
					className="flex items-center justify-center text-green-200 mb-4"
				>
					<CheckCircle size={60} className="text-green-500" />
				</motion.div>
				<h1 className="text-2xl text-green-500 font-bold">¡Pago Exitoso!</h1>
				<p className="text-black mt-2">Tu pago se ha procesado correctamente.</p>
				<p className="text-gray-500 text-sm mt-1">
					Nuestros administradores se pondrán en contacto contigo pronto.
				</p>
				<Link href={"/dashboard/user"} >
				<Button className="mt-4 w-full bg-black hover:bg-black/80 transition duration-300 ease">
					Volver al panel de usuario
				</Button>
				</Link>
			</motion.div>
				
		</div>
	);
}
