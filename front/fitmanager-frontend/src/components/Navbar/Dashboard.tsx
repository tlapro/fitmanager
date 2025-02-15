"use client";
import { useState, useEffect, useRef } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  const { user, isLoading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative" ref={menuRef}>
        <div
          className="flex justify-center items-center p-1 hover:bg-gray-100 hover:text-blue-500 rounded-lg ml-4 mr-4 cursor-pointer"
          onClick={toggleMenu}
        >
          {user.imgUrl ? (
            <div className="w-[42px] h-[42px] rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src={user.imgUrl}
              alt="User Image"
              width={42}
              height={42}
              className="object-cover w-full h-full"
            />
          </div>
          ) : (
            <FaCircleUser
            size={26}
            className={`${
              isMenuOpen ? "text-blue-500" : "text-black"
              } transition duration-300 ease`}
              />
            )}
            </div>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {(user.id_rol === 1 || user.id_rol === 2) && (
              <Link
                href="/dashboard/administration"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Administración
                </div>
              </Link>
            )}
            <Link href="/dashboard/user" onClick={() => setIsMenuOpen(false)}>
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Mi Perfil
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-start items-center gap-2"
            >
              Cerrar Sesión <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
