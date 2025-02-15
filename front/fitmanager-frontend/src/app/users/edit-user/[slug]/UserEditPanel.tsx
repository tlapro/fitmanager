/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getUserInfo } from "@/helpers/getUserInfo";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidError } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import axios from "axios";
import { Toast } from "@/components/Toast/Toast";
import ToastConditional from "@/components/ToastConditional/ToastConditional";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function UserEditPanel({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserInfo(params.slug);
      setUserData(fetchedUser);
      setRole(fetchedUser?.id_rol?.toString() || "3");
      setIsActive(fetchedUser?.isActive || false);
      setLoading(false);
    };
    fetchUser();
  }, [params]);

  const handleDelete = async () => {
    if (!userData) return;

    const firstMessage = {
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar a este usuario?",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "black", 
    };


    const confirmDelete = await ToastConditional({      title: "¿Estás seguro?",
      text: "¿Deseas eliminar a este usuario?",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "black", });

      if (!confirmDelete) return;

      const token = localStorage.getItem("token");


      if (userData?.id_user === user?.id_user) {
        Toast.fire({ icon: "error", title: "No puedes eliminar tu propio usuario." });
        return;
      }
    try {

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userData.id_user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.fire({ icon: "success", title: "Usuario eliminado con éxito." });
      router.push("/dashboard/administration");
    } catch {
      Toast.fire({ icon: "error", title: "Error al eliminar el usuario." });
  };
}

  const handleSubmit = async () => {
    if (!userData) return;

    const updatedUser = {
      id_rol: Number(role),
      isActive: isActive,
    };

    const messages = {
      title: "¿Estás seguro?",
      text: "¿Deseas cambiar los datos del usuario?",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "black",  
    };
    const token = localStorage.getItem("token");

    if (userData?.id_user === user?.id_user) {
      Toast.fire({ icon: "error", title: "No puedes modificar tu propio usuario." });
      return;
    }

    const confirmUpdate = await ToastConditional(messages);
    if (!confirmUpdate) return;

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-admin/${userData.id_user}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.fire({ icon: "success", title: "Cambios realizados con éxito." });
    } catch (error) {
      Toast.fire({ icon: "error", title: "Error al realizar los cambios." });
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center w-full mt-24">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return userData ? (
    <div className="flex flex-col w-full justify-center items-center mt-24">
      <div className="flex w-10/12 justify-start items-start">
        <Link
          className="border-[1px] p-1 border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300 ease"
          href="/dashboard/administration"
        >
          <IoIosArrowBack size={25} />
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Edición del Usuario</h1>

      <div className="w-10/12 flex-col border-[1px] border-gray-200 rounded-lg mb-10 shadow-md">
        <div className="w-full flex items-center justify-between p-4 bg-gray-50 border-b-[1px] border-gray-200">
          <h1 className="text-xl font-bold text-center w-full">
            {userData.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col">
            {[
              { label: "Nombre", value: userData.name },
              { label: "Teléfono", value: userData.phone },
              { label: "Email", value: userData.email },
            ].map(({ label, value }, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <h1 className="font-bold">{label}:</h1>
                <p>{value}</p>
              </div>
            ))}
                      <div className="grid grid-cols-2 gap-4">
              <h1 className="font-bold">Rol:</h1>
              <select
                className="border rounded p-1"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="1">Administrador</option>
                <option value="2">Entrenador</option>
                <option value="3">Socio</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <h1 className="font-bold">Estado:</h1>
              <select
                className="border rounded p-1"
                value={isActive ? "1" : "0"}
                onChange={(e) => setIsActive(e.target.value === "1")}
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            {[
              { label: "País", value: userData?.country || "No especificado" },
              { label: "Ciudad", value: userData?.city || "No especificado" },
              {
                label: "Dirección",
                value: userData?.address || "No especificado",
              },
              { label: "Fecha de Alta", value: userData.entry_date },
            ].map(({ label, value }, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <h1 className="font-bold">{label}:</h1>
                <p>
                  {value instanceof Date ? value.toLocaleDateString() : value}
                </p>
              </div>
            ))}


          </div>
        </div>

        <div className="flex justify-center p-4">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
          >
            Guardar cambios
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition ml-4 duration-300"
          >
            Eliminar usuario
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-full justify-center items-center mt-24">
      <div className="flex w-10/12 justify-start items-start ml-10">
        <Link
          className="border-[1px] p-1 border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300 ease"
          href="/dashboard/administration"
        >
          <IoIosArrowBack size={25} />
        </Link>
      </div>
      <div className="flex w-4/12 flex-col border-[1px] justify-center items-center mx-auto border-gray-200 rounded-lg mb-10 shadow-md mt-4">
        <div className="flex p-4 font-bold">
          <BiSolidError size={20} />
          <h1 className="ml-2">Usuario no encontrado</h1>
        </div>
      </div>
    </div>
  );
}
