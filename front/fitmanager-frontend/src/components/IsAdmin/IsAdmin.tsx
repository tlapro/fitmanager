"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/interfaces/IUser";

const IsAdmin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user: IUser | null = storedUser ? JSON.parse(storedUser) : null;

    if (!user || user?.id_rol === 3) {
      router.push("/home");
    } else if (user?.id_rol === 2) {
        router.push("/dashboard/administration/coaches");
    } else {
        setIsLoading(false);
    }
  }, [router]);

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

export default IsAdmin;
