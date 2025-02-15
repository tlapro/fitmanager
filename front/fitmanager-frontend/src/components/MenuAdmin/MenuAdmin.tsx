"use client";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


export default function MenuAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 


  return (

        <div className="w-full md:w-2/12 max-h-fit flex flex-col border-[1px] border-gray-200 rounded-lg">
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={`flex justify-center md:justify-between items-center p-4 cursor-pointer transition duration-300 ease ${isMenuOpen ? "bg-gray-100" : "hover:bg-gray-100"}`}
          >
            <h1 className="text-base md:text-md">Menú</h1>
            <FaChevronDown size={12} className={`transform ${isMenuOpen ? "rotate-180 ml-2" : "ml-2"}`} />
          </div>

          {isMenuOpen && (
            <div>
              <Link href="/dashboard/administration"
              onClick={() => setIsMenuOpen(false)}>
              
                <div className="flex flex-col w-full gap-4 justify-center items-center border-b-[1px] p-4 hover:bg-gray-100 transition duration-300 ease cursor-pointer">
                  <h1 className="text-base md:text-md">Administradores</h1>
                </div>
              </Link>
              <Link href="/dashboard/administration/coaches"
              onClick={() => setIsMenuOpen(false)}>
              
                <div className="flex flex-col w-full gap-4 justify-center items-center border-b-[1px] p-4 hover:bg-gray-100 transition duration-300 ease cursor-pointer">
                  <h1 className="text-base md:text-md">Entrenadores</h1>
                </div>
              </Link>
            </div>
          )}
        </div>


  );
}
