"use client";

import { Toast } from "@/components/Toast/Toast";
import ToastConditional from "@/components/ToastConditional/ToastConditional";
import { useAuth } from "@/context/AuthContext";
import { deleteHealthsheet } from "@/helpers/deleteHealthsheet";
import { getHealthsheet } from "@/helpers/getHealthsheet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Healthsheet {
  id_sheet: string;
  urlSheet: string;
  isTemporary: boolean;
}

export default function UserHealthsheet() {
  const router = useRouter();
  const [healthsheet, setHealthsheet] = useState<Healthsheet | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const data = await getHealthsheet(user.id_user);
          setHealthsheet(data);
          setErrorMessage(null);
        } catch {
          setHealthsheet(null);
          setErrorMessage("Ficha Médica inexistente.");
        }
      }
    };

    fetchData();
  }, [user]);

  const deleteHS = async () => {
    if (!healthsheet) return;


    const confirmUpdate = await ToastConditional({
      title: "¿Seguro que quieres eliminar esto?",
      text: "Esta acción no se puede deshacer",
      confirmButtonText: "¡Eliminar!",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "red",
    });

    if (!confirmUpdate) return;

    try {
      await deleteHealthsheet(healthsheet?.id_sheet);
      Toast.fire({ icon: "success", title: "Ficha Médica eliminada con éxito." });
      setHealthsheet(null);
      router.push("/dashboard/user/");
    } catch (error) {
      console.error("Error al borrar la Ficha Médica:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Hoja de Salud de Usuario</h1>
      {errorMessage ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-red-500">{errorMessage}</p>
          <Link
            href={"/dashboard/user/healthsheet/create"}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
          >
            Nueva Ficha Médica
          </Link>
        </div>
      ) : healthsheet ? (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <p className="font-semibold">
            Ficha médica de <span className="text-blue-500">{user?.name}</span>
          </p>
          <Link
            href={healthsheet.urlSheet}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
          >
            Acceder a mi Ficha médica
          </Link>
          <button
            onClick={deleteHS}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
          >
            Borrar mi Ficha Médica
          </button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
