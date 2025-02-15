"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {

      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const userData = urlParams.get("user");

      if (userData) {
        const parsedUser = JSON.parse(decodeURIComponent(userData));
        
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(parsedUser)); 
        

          router.push("/home"); 
        } else {
          console.error("No se encontró el token");
          router.push("/login");  
        }
      } else {
        console.error("No se encontró información de usuario");
        router.push("/login"); 
      }
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Procesando autenticación...</p>
    </div>
  </div>
  );
}
