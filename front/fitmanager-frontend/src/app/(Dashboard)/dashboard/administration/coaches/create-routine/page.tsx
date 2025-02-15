import MenuAdmin from "@/components/MenuAdmin/MenuAdmin";
import AddRoutine from "./AddRoutine";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function createRoutine() {
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
          <div className="flex flex-col items-center">
            <AddRoutine />
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
