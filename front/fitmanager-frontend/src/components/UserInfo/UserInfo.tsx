import Link from "next/link";

export default function UserInfo({
  id,
  name,
  email,
  active,
}: {
  id: string;
  name: string;
  email: string;
  active: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-full text-center border-gray-200 border-t-[1px] border-b-[1px] py-2">
      <div className="p-2">{name}</div>
      <div className="p-2">{email}</div>
      <div
        className={
          active ? "p-2 text-green-500 font-bold" : "p-2 text-red-500 font-bold"
        }
      >
        {active ? "Activo" : "Inactivo"}
      </div>
      <div className="p-2 sm:col-span-1 md:col-span-1">
        <Link
          className="w-full text-center text-sm p-2 bg-black text-white hover:bg-gray-800 transition duration-300 ease rounded-md border-[1px] border-gray-400"
          href={`/users/${id}`}
        >
          Detalles
        </Link>
      </div>
    </div>
  );
}
