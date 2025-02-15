/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Toast } from "@/components/Toast/Toast";
import ToastConditional from "@/components/ToastConditional/ToastConditional";
import { useAuth } from "@/context/AuthContext";
import { putUpdatePassword } from "@/helpers/putUpdatePassword";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export interface IOldPassword {
  password: string;
}
export interface IChangePassword {
  password: string;
  confirmPassword: string;
}

export default function UpdatePassword() {

  const { user, changePasswordAuth } = useAuth();
  const router = useRouter();
  const [validate, setValidate] = useState(false);
  const [oldPassword, setOldPassword] = useState<IOldPassword>({
    password: "",
  });
  const [formData, setFormData] = useState<IChangePassword>({
    password: "",
    confirmPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (newPassword: string, oldPassword: string) => {
    if (newPassword === oldPassword) {
      return "La nueva contraseña no puede ser igual a la anterior.";
    }
    if (newPassword.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    if (!/[A-Z]/.test(newPassword)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }
    if (!/[0-9]/.test(newPassword)) {
      return "La contraseña debe contener al menos un número.";
    }
    return null;
  };

  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOldPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOldPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await changePasswordAuth(oldPassword.password);
      if (!response) {
        setValidate(false);
        return;
      }
      setValidate(true);
    } catch {
      setValidate(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    const validationError = validatePassword(formData.password, oldPassword.password);
    if (validationError) {
      Toast.fire({
        icon: "error",
        title: validationError,
      });
      return;
    }

    const messages = {
      title: "¿Estás seguro?",
      text: "¿Deseas cambiar tu contraseña?",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "black", 
    };

    const confirmUpdate = await ToastConditional(messages);
    if (!confirmUpdate) return;
    

    try {
      const response = await putUpdatePassword(user?.id_user, formData);
      Toast.fire({
        icon: "success",
        title: "Contraseña actualizada con éxito.",
      });
      router.push("/home");
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: "Las contraseñas no coinciden.",
      });
    }
  };

  return validate === false ? (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Actualizar Contraseña
      </h1>
      <form
        onSubmit={handleSubmitOldPassword}
        className="flex flex-col items-center justify-center gap-3"
      >
        <label htmlFor="password" className="block font-medium text-gray-700">Contraseña actual</label>
        <div className="relative w-4/12">
          <input
            className="border w-full text-center p-2 rounded"
            type={showOldPassword ? "text" : "password"} 
            name="password"
            placeholder="Ingresa tu contraseña actual"
            value={oldPassword.password || ""}
            onChange={handleChangeOldPassword}
          />
          <button
            type="button"
            onClick={() => setShowOldPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />} 
          </button>
        </div>
        <button
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300 ease focus:outline-none focus:ring focus:ring-indigo-300"
          type="submit"
        >
          Aceptar
        </button>
      </form>
    </div>
  ) : (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Actualizar Contraseña
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-3"
      >
        <label htmlFor="password" className="block font-medium text-gray-700">Nueva Contraseña</label>
        <div className="relative w-4/12">
          <input
            className="border w-full text-center p-2 rounded"
            type={showNewPassword ? "text" : "password"}
            name="password"
            placeholder="Ingresa tu nueva contraseña"
            value={formData.password || ""}
            onChange={handleChangeNewPassword}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <label htmlFor="confirmPassword" className="block font-medium text-gray-700">Repetir Contraseña</label>
        <div className="relative w-4/12">
          <input
            className="border w-full text-center p-2 rounded"
            type={showConfirmPassword ? "text" : "password"} 
            name="confirmPassword"
            placeholder="Repite la contraseña"
            value={formData.confirmPassword || ""}
            onChange={handleChangeNewPassword}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex justify-center items-center gap-2">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300 ease focus:outline-none"
            type="submit"
          >
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
}
