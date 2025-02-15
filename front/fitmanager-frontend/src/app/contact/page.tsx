"use client";
import { Toast } from "@/components/Toast/Toast";
import Image from "next/image";
import { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contactus/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }
      Toast.fire({ icon: "success", title: "Mensaje enviado con éxito." });

      setFormData({ name: "", email: "", message: "" });
    } catch {
      Toast.fire({ icon: "error", title: "Error al enviar el mensaje." });
    }
  };

  return (
    <div className="flex flex-col pb-20 md:flex-row min-h-screen">
      {/* Mapa */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full h-64 md:h-3/4 md:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016713573646!2d-58.38414532521114!3d-34.60373887295425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11bead4e234e558b!2sObelisco!5e0!3m2!1ses!2sar!4v1737565902072!5m2!1ses!2sar"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
            Contáctenos
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tu mensaje"
                value={formData.message}
                onChange={handleChange}
                autoComplete="off"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <Image
          src="/img-contact.jpeg"
          alt="Imagen de contacto"
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-80"
        />
      </div>
    </div>
  );
};

export default Contact;
