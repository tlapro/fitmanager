import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const usePrivate = () => {
  const router = useRouter();
  const { isLoading, user } = useAuth();
  useEffect(() => {
    if (!isLoading) {
        if (!user || user.id_rol === 3) {
            router.push("/home");
        }
    }
}, [isLoading, user, router]);


};