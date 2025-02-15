"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dashboard from "./Dashboard";

export default function NavButtons() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (isAuthenticated) {
    return (
      <>
        <Dashboard />
      </>
    );
  }

  if (!isAuthenticated && pathname === "/register") {
    return (
      <div className="flex justify-center items-center p-2">
        <Link
          className="w-[8rem] text-center p-1 ml-4 text-gray-600 hover:text-gray-900 transition duration-300"
          href="/login"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  } else if (!isAuthenticated && pathname === "/login") {
    return (
      <div className="flex justify-center items-center p-2">
        <Link
          className="w-[12rem] text-center p-1 ml-4 bg-black text-white hover:bg-gray-800 transition duration-300 ease-in-out rounded-lg"
          href="/register"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-2">
      <Link
                  className="w-[8rem] text-center p-1 ml-4 text-gray-600 hover:text-gray-900 transition duration-300"
        href="/login"
      >
        Iniciar Sesión
      </Link>
      <Link
        className="w-[10rem] text-center text-white p-1 ml-4 bg-black font-medium rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
        href="/register"
      >
        Registrarse
      </Link>
    </div>
  );
}
