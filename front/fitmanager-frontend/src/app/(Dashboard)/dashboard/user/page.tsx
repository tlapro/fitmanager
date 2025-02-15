"use client"
import MenuUsers from "@/components/MenuUsers/MenuUsers";
import NotLoggedRedirect from "@/components/NotLoggedRedirect/NotLoggedRedirect";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function User() {
    const { user } = useAuth();
    return (
      <NotLoggedRedirect>
        <div className="flex flex-col md:flex-row mt-20">
          <div className="w-10/12 justify-center items-center md:w-2/12 md:h-fit border-[1px] border-gray rounded-lg m-6">
            <MenuUsers />
          </div>
          <div className="flex flex-col justify-center items-center w-10/12 border-[1px] border-gray rounded-lg m-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <h1 className="text-3xl font-extrabold text-black mb-4">¡Bienvenido al Panel de Usuario!</h1>
            <h2 className="text-xl font-medium text-gray-700 mb-6">
              ¡Hola, <span className="text-blue-500">{user?.name}</span>!
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Desde aquí puedes acceder a todas las herramientas de gestión de tu cuenta y revisar tus rutinas y progresos.
            </p>
            <div className="flex space-x-4">
              <Link href={"/dashboard/user/routines"} className="px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-200">
                Rutinas
              </Link>
              <Link href={"/dashboard/user/data"} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-200">
                Mis Datos
              </Link>
            </div>
          </div>
        </div>
      </NotLoggedRedirect>
    );
  }
  