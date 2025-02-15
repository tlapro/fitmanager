'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AboutUsPage() {
  const images = [
    "/gimnasio.jpeg",
    "/gimnasio2.jpg",
    "/gimnasio3.jpeg",
    "/gimnasio4.jpeg",
    "/gimnasio5.jpeg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/ImagenSobreNosotros.webp"
          alt="Gym Equipment"
          fill
          className="object-cover brightness-50"
          priority
        />
        <motion.div
          className="flex flex-col items-center z-10 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold italic text-white drop-shadow-lg tracking-wide">
            <span className="text-orange-500">¿Quiénes </span>
            <span className="text-white">Somos?</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-md text-gray-300 mt-4 max-w-2xl"
          >
            Una plataforma dedicada a transformar tu experiencia fitness, conectándote con tus metas de manera efectiva.
          </motion.p>
        </motion.div>
      </div>

      {/* About Section */}
      <section className="container mx-auto px-6 py-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center mb-8"
        >
          <Image src="/LogoFitManager.png" alt="FitManager Logo" width={100} height={100} className="drop-shadow-xl" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
        >
          Nuestra Misión
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-md text-gray-700 max-w-3xl mx-auto leading-relaxed"
        >
          Proporcionamos un acompañamiento integral con rutinas personalizadas, atención especializada
          y un seguimiento continuo para garantizar el progreso y el logro de tus objetivos fitness de manera sostenible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-3xl mx-auto"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Qué nos hace diferentes?</h3>
          <p className="text-md text-gray-700">
            Nos diferenciamos por nuestro enfoque personalizado, combinando tecnología avanzada con asesoramiento humano.
            Nuestra plataforma adapta las rutinas según tus progresos y necesidades, asegurando resultados óptimos.
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-50 py-14">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-8"
        >
          Explora nuestra galería de equipos
        </motion.h2>

        <div className="relative max-w-3xl mx-auto h-[400px] overflow-hidden rounded-2xl shadow-xl">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Imagen ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                currentIndex === index ? "opacity-100" : "opacity-0"
              }`}
              priority
            />
          ))}
        </div>
      </section>
    </div>
  );
}
