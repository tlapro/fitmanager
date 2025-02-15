"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "../Toast/Toast";
import { useAuth } from "@/context/AuthContext";

const GoogleProtected = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.birthdate === null || user?.phone === "" || user?.address === "" || user?.city === "" || user?.country === "") {
      router.replace("/dashboard/user/data/updatedata");
      Toast.fire({ icon: "error", title: "Completa tus datos para continuar" });
    } else {
      setIsLoading(false);
    }
  }, [router, user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GoogleProtected;
