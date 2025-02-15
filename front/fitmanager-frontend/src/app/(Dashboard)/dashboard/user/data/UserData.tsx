"use client";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { TiKeyOutline } from "react-icons/ti";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import { getUserProfile } from "@/helpers/getUserProfile";
import ProfilePictureUploader from "@/components/ClientOnly/ProfilePictureUploader";

export default function UserData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<IUser | null>(user || null);
  const [isGoogleUser, setIsGoogleUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (user?.password === "") {
      setIsGoogleUser(true);
    }
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        const fetchedUser = await getUserProfile(user?.id_user);
        setUserData(fetchedUser);
        localStorage.setItem("isActive", fetchedUser?.isActive ? "true" : "false");
        setLoading(false);
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user]);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Cargando...</p>
    </div>
  )
} 
  return user ? (
    <div className="flex flex-col w-full justify-center items-center mb-2">
      <div className="w-full flex items-center justify-between p-4 bg-gray-50 border-b-[1px] border-gray-200">
        <div className="w-1/3">
				<ProfilePictureUploader userId={user?.id_user} />
		</div>

        <h1 className="text-xl font-bold text-center w-1/3">
			{userData?.name}
        </h1>

        <div className="w-1/3 flex flex-col items-end justify-end">
          <Link href="/dashboard/user/data/updatedata">
            <div className="w-full flex justify-end">
              <button className="text-gray-500 group hover:text-blue-500 cursor-pointer ml-2 flex items-center">
                Actualizar Información
                <BiEdit
                  size={24}
                  className="text-gray-500 group-hover:text-blue-500 cursor-pointer ml-2"
                />
              </button>
            </div>
          </Link>
          {!isGoogleUser && (
            <Link href="/dashboard/user/data/update-password">
              <div className="w-full flex justify-end">
                <button className="text-gray-500 group hover:text-blue-500 cursor-pointer ml-2 flex items-center">
                  Cambiar Contraseña
                  <TiKeyOutline
                    size={24}
                    className="text-gray-500 group-hover:text-blue-500 cursor-pointer ml-2"
                  />
                </button>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="w-full flex-col rounded-lg mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col">
            {[
              { label: "Nombre", value: userData?.name },
              {
                label: "Estado",
                value: (
                  <span
                    className={
                      userData?.isActive
                        ? "text-green-500 font-bold"
                        : "text-red-500 font-bold"
                    }
                  >
                    {userData?.isActive ? "Activo" : "Inactivo"}
                  </span>
                ),
              },
              {
                label: "Teléfono",
                value: userData?.phone || "No especificado",
              },
              { label: "Email", value: userData?.email },
              {
                label: "Fecha de Nacimiento",
                value: userData?.birthdate || "No especificado",
              },
            ].map(({ label, value }, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_2fr] md:grid-cols-2 gap-4"
              >
                <h1 className="font-bold">{label}:</h1>
                <p>{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            {[
              { label: "País", value: userData?.country || "No especificado" },
              { label: "Ciudad", value: userData?.city || "No especificado" },
              {
                label: "Dirección",
                value: userData?.address || "No especificado",
              },

              {
                label: "Fecha de Ingreso",
                value: userData?.entry_date,
              },
            ].map(({ label, value }, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_2fr] md:grid-cols-2 gap-4"
              >
                <h1 className="font-bold">{label}:</h1>
                <p>
                  {value instanceof Date ? value.toLocaleDateString() : value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Cargando...</p>
    </div>
  </div>
  );
}
