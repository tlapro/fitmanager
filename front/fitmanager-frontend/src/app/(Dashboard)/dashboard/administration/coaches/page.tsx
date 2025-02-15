"use client";
import { getAllRoutines } from "@/helpers/getAllRoutines";
import { IRoutines } from "@/interfaces/IRoutines";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MenuAdmin from "@/components/MenuAdmin/MenuAdmin";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function CoachesPage() {
  const [routines, setRoutines] = useState<IRoutines[]>([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      const routinesData = await getAllRoutines();
      setRoutines(routinesData);
    };

    fetchRoutines();
  }, []);

  const level1 = routines.filter((routine) => routine.id_level === 1);
  const level2 = routines.filter((routine) => routine.id_level === 2);
  const level3 = routines.filter((routine) => routine.id_level === 3);

  return (
    <ProtectedRoute>
      <div className="flex flex-col w-full justify-center items-center mt-20">
        <div className="flex flex-col md:flex-row w-full gap-4 p-4">
          <div className="w-full md:w-4/12">
            <h1 className="text-xl md:text-2xl font-bold">
              Panel Administración
            </h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4 p-4">
          <MenuAdmin />
          <div className="w-full md:w-10/12 flex flex-col items-center border-[1px] border-gray-200 rounded-lg min-h-[60vh] p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2">Rutinas Nivel 1</h2>
                {level1.map((routine, index) => (
                  <Link
                    key={routine.id_cat}
                    href={routine.url_imagen}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="mb-2 w-40">{`Rutina ${String.fromCharCode(
                      65 + index
                    )}`}</Button>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2">Rutinas Nivel 2</h2>
                {level2.map((routine, index) => (
                  <Link
                    key={routine.id_cat}
                    href={routine.url_imagen}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="mb-2 w-40">{`Rutina ${String.fromCharCode(
                      65 + index
                    )}`}</Button>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2">Rutinas Nivel 3</h2>
                {level3.map((routine, index) => (
                  <Link
                    key={routine.id_cat}
                    href={routine.url_imagen}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="mb-2 w-40">{`Rutina ${String.fromCharCode(
                      65 + index
                    )}`}</Button>
                  </Link>
                ))}
              </div>
            </div>
            <hr className="m-10 w-2/4 border-gray-300 border-1" />
            <div className="flex flex-col items-center mb-20">
              <Link href="/dashboard/administration/coaches/create-routine">
                <button className="bg-black hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg">
                  Agregar rutina
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
