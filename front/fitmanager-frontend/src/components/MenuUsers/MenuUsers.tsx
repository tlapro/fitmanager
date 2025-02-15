"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineMedicalInformation, MdOutlinePayment } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";

export default function MenuUsers() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    `flex items-center gap-4 w-full border-b-[1px] p-4 transition duration-300 ease-in-out cursor-pointer ${
      pathname === path ? "bg-gray-100 font-semibold text-blue-500" : "hover:bg-gray-50 text-gray-700"
    }`;

  const iconStyle = (isActive: boolean) =>
    `transition duration-300 ease-in-out ${isActive ? "text-blue-500" : "text-gray-500"}`;

  return (
    <div className="w-full max-w-md mx-auto">
      <div>
        <Link href="/dashboard/user/data">
          <div className={linkStyle("/dashboard/user/data")}>
            <IoIosInformationCircleOutline size={25} className={iconStyle(pathname === "/dashboard/user/data")} />
            <h1 className="text-base md:text-md">Mi información</h1>
          </div>
        </Link>
        <Link href="/dashboard/user/payments">
          <div className={linkStyle("/dashboard/user/payments")}>
            <MdOutlinePayment size={25} className={iconStyle(pathname === "/dashboard/user/payments")} />
            <h1 className="text-base md:text-md">Pagos</h1>
          </div>
        </Link>
        <Link href="/dashboard/user/routines">
          <div className={linkStyle("/dashboard/user/routines")}>
            <LuFileSpreadsheet size={25} className={iconStyle(pathname === "/dashboard/user/routines")} />
            <h1 className="text-base md:text-md">Mis Rutinas</h1>
          </div>
        </Link>
        <Link href="/dashboard/user/healthsheet">
          <div className={linkStyle("/dashboard/user/healthsheet")}>
            <MdOutlineMedicalInformation
              size={25}
              className={iconStyle(pathname === "/dashboard/user/healthsheet")}
            />
            <h1 className="text-base md:text-md">Hoja de Salud</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
