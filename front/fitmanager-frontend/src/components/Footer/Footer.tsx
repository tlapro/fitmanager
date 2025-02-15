import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
          
          <div className="flex flex-col items-center lg:items-start md:items-center sm:items-center">
            <h1 className="font-bold mt-4 mb-6 text-lg">Información de Contacto</h1>
            <p>Dirección: Calle Falsa 123, Ciudad, País</p>
            <p>Teléfono: +56 (0) 000 000 000</p>
            <p>Correo: fitmanager.henry@gmail.com</p>
            <h1 className="font-bold mt-4 mb-6 text-lg">Horarios de Atención</h1>
            <p>Lunes a Viernes: 6:00 AM - 10:00 PM</p>
            <p>Sábado: 10:00 AM - 6:00 PM</p>
            <p>Domingo: Cerrado</p>
          </div>

          <div className="flex flex-col items-center sm:items-center">
            <h1 className="font-bold mt-4 mb-6 text-lg">Enlaces Rápidos</h1>
            <div className="flex flex-col gap-2">
              <Link className="hover:text-blue-600 hover:ml-1 transition duration-200 ease-in" href="/home">Inicio</Link>
              <Link className="hover:text-blue-600 hover:ml-1 transition duration-200 ease-in" href="/plans">Planes</Link>
              <Link className="hover:text-blue-600 hover:ml-1 transition duration-200 ease-in" href="/aboutus">Sobre Nosotros</Link>
              <Link className="hover:text-blue-600 hover:ml-1 transition duration-200 ease-in" href="/contact">Contacto</Link>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-center">
            <h1 className="font-bold mt-4 mb-6 text-lg">Redes Sociales</h1>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-gray-800 hover:text-pink-600"
              >
                <FaInstagram size={30} />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-gray-800 hover:text-blue-600"
              >
                <FaFacebook size={30} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-gray-800 hover:text-blue-500"
              >
                <FaXTwitter size={30} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </footer>

  );
}
