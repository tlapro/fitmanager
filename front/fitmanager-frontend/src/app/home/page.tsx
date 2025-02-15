/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CoachCard from "@/components/CoachCard/CoachCard";
import { CommentForm } from "@/components/general/CommentForm";
import { TestimonialCard } from "@/components/general/TestimonialCard";
import { coaches } from "@/config/coaches";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id_user: string;
  name: string;
  imgUrl?: string; 
}

interface Comment {
  id_comment: string;
  content: string;
  rating: number;
  user: User;
}

const testimonials = [
  {
    name: "María García",
    image:
      "https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg",
    comment:
      "Excelente gimnasio, los entrenadores son muy profesionales y el ambiente es muy motivador. He logrado todos mis objetivos gracias a su ayuda.",
    rating: 5,
  },
  {
    name: "Juan Pérez",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    comment:
      "Las instalaciones son modernas y siempre están limpias. El acceso 24/7 me permite entrenar según mi horario.",
    rating: 4.5,
  },
  {
    name: "Ana Martínez",
    image:
      "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
    comment:
      "Los planes personalizados son fantásticos. Mi entrenador realmente entiende mis necesidades y me ayuda a superarme.",
    rating: 5,
  },
  {
    name: "Claudia Mendoza",
    image:
      "https://media.istockphoto.com/id/1369508766/photo/beautiful-successful-latin-woman-smiling.jpg?s=2048x2048&w=is&k=20&c=vMRpbtNfd_fh3f5HyMFxuZyOcW04uS_OtPnotEGZHoA=",
    comment:
      "Haber pagado por la membresía me ha permitido tener un entrenador que me ayude a lograr mis objetivos.",
    rating: 5,
  },
  {
    name: "Carlos Daza",
    image:
      "https://media.istockphoto.com/id/1445597021/photo/black-man-phone-and-social-media-in-city-reading-text-message-or-communication-on-social.jpg?s=2048x2048&w=is&k=20&c=rhjiSqX3PInj5Hp6PIgWOgcnmRIed1NH9UxLtI4Fsps=",
    comment:
      "El ambiente es muy agradable y el personal es muy amable. Me ha gustado mucho mi entrenamiento.",
    rating: 4.5,
  },
  {
    name: "Jose Ricardo Castillo",
    image:
      "https://as2.ftcdn.net/v2/jpg/02/24/86/95/1000_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
    comment:
      "El conjunto de entregas es muy bueno. Los entrenadores son muy profesionales y siempre están dispuestos a ayudar.",
    rating: 4,
  },
];

export default function Home() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`)
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response) throw new Error("Error al cargar comentarios");
      setComments(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full h-[500px]">
        <Image
          src="/ImgHome.jpeg"
          alt="home"
          className="w-full h-full object-cover"
          width={3000}
          height={2000}
        />

        <div className="absolute inset-0 bg-gray-500 opacity-50"></div>

        <div className="absolute inset-0 flex items-center justify-center bg-gray-400/20">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/LogoFitManager.png"
              alt="logo"
              width={200}
              height={200}
            />
            <h1 className="text-black text-center text-5xl font-bold">
              FitManager
            </h1>
            <div className="font-serif">
              <Link
                className="w-[10rem] text-center m-2 text-black p-2 bg-gray-300 hover:bg-gray-200 transition duration-300 ease rounded-lg border-[1px] border-gray-400"
                href="/aboutus"
              >
                ¿Quienes somos?
              </Link>
              <Link
                className="w-[12rem] text-center p-2 mr-4 bg-black text-white hover:bg-gray-800 hover:border-gray-950 transition duration-300 ease rounded-lg border-[1px] border-black"
                href="/login"
              >
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="m-10 font-bold text-2xl">
          <h1>Entrenadores</h1>
          <hr className="ml-4 border-b-1 border-black w-[9rem]" />
        </div>
        <div>
          <div className="flex justify-center items-center">
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4 mb-20">
              {coaches.map((coach) => (
                <CoachCard
                  key={coach.id}
                  id={coach.id}
                  name={coach.name}
                  img={coach.img}
                  description={coach.description}
                  email={coach.email}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Opiniones de nuestros clientes
            </h2>
        {loading ? (
            <div className="text-center">Cargando comentarios...</div>
        ) : error ? (
          <div className="text-red-500 text-center"></div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {comments.map((comment) => (
              <TestimonialCard
                key={comment.id_comment as string}
                name={comment.user.name}
                image={comment.user.imgUrl || "/placeholder.svg"}
                comment={comment.content}
                rating={comment.rating}
              />
            ))}
          </div>
        )}

          <div className="pt-4">
            <CommentForm onSuccess={fetchComments} />
          </div>

      </section>
    </div>
  );
}
