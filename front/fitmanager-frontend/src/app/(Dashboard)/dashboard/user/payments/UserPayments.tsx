import { SiMercadopago } from "react-icons/si";
import { FaStripe } from "react-icons/fa";
import Link from "next/link";

export default async function UserPayments() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-2xl font-bold p-4 text-center">
          Seleccioná un método de pago
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap">
          <Link href="/dashboard/user/payments/mercado-pago">
		  <div className="flex group hover:bg-indigo-50 transition-colors duration-500 ease-in-out cursor-pointer justify-center items-center bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105">
              <SiMercadopago size={50} color="blue" />
              <h1 className="text-mg ml-4">Pagar con MercadoPago</h1>
            </div>
          </Link>
          <Link href="/dashboard/user/payments/stripe">
		  <div className="flex group hover:bg-indigo-50 transition-colors duration-500 ease-in-out cursor-pointer justify-center items-center bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105">
              <FaStripe size={50} color="blue" />
              <h1 className="text-mg ml-4">Pagar con Stripe</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
