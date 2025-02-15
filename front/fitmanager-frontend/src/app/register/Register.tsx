/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Toast } from "@/components/Toast/Toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RegisterValidate, validateName, validatePassword, ValidationErrors } from "@/helpers/registerValidate";
import { registerInputs } from "@/helpers/registerInputs";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Limpiar errores del campo actual
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let error = "";
    if (name === "name") {
      error = validateName(value) || "";
    } else if (name === "password") {
      error = validatePassword(value) || "";
    } else if (name === "confirmPassword" && value !== formData.password) {
      error = "Las contraseñas no coinciden.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = RegisterValidate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, formData);
      Toast.fire({ icon: "success", title: "Registro exitoso." });
      router.push("/login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Ocurrió un error al intentar registrarse.";
      Toast.fire({ icon: "error", title: errorMessage });
    }
  };

  return (
    <div className="flex h-[80rem] bg-[url('/fondo-register-login.jpg')] bg-cover bg-center mb-20">
      <div className="hidden md:block w-1/2"></div>

      <div className="w-full md:w-1/2 flex items-start justify-center pt-20 md:pt-36">
        <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Registrarse
          </h1>
          <form onSubmit={handleSubmit}>
            {registerInputs.map((field) => (
              <div key={field.name} className="mb-4">
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}

                />
                {errors[field.name] && <p className="text-red-600 text-sm">{errors[field.name]}</p>}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
            >
              Registrarse
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700">
                ¿Ya tienes una cuenta?{" "}
                <a href="/login" className="text-indigo-600 hover:underline">
                  Iniciar sesión
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
