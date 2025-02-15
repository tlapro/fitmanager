"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { jwtDecode } from "jwt-decode"

// Initialize MercadoPago with your public key
initMercadoPago('APP_USR-555d9faa-7d27-4cb6-9ea5-326f18f1b89c');

interface Plan {
  title: string;
  price: number;
  benefits: string[];
}

const plans: Plan[] = [
  {
    title: "Plan Básico",
    price: 1,
    benefits: ["Acceso al Gimnasio", "Asistencia Pasiva", "Registro de avances"],
  },
  {
    title: "Plan Pro",
    price: 50000,
    benefits: [
      "Acceso al Gimnasio",
      "Asistencia Pasiva",
      "Registro de avances",
      "Plan de entrenamiento",
    ],
  },
  {
    title: "Plan Avanzado",
    price: 75000,
    benefits: [
      "Acceso al Gimnasio",
      "Asistencia Activa",
      "Registro de avances",
      "Plan de entrenamiento",
      "Plan dietético",
    ],
  },
];

export default function MercadoPago() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (preferenceId) {
      
    }
  }, [preferenceId]);

  const handleCreatePreference = async (plan: Plan) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró un token. El usuario no está autenticado.');
        return;
      }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken: any = jwtDecode(token)
      const userId = decodedToken.id

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-preference`,
       {
          turno: {
            service: plan.title,
            price: plan.price,
          },
          userId: userId, // Añadir el ID del usuario a la solicitud
          userEmail: decodedToken.email, // Añadir el email del usuario si es necesario
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data && response.data.id) {
        setPreferenceId(response.data.id)
        setSelectedPlan(plan)
        
      } else {
        throw new Error("La respuesta del servidor no contiene un ID de preferencia válido")
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error)
      setError("Error al crear la preferencia de pago")
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Nuestras Membresías</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <h3 className="text-xl font-semibold text-center">{plan.title}</h3>
              <div className="text-center">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-sm text-gray-500">/mes</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>• {benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleCreatePreference(plan)}
                disabled={!!preferenceId}
              >
                {preferenceId ? 'Seleccionado' : 'Seleccionar'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {preferenceId && selectedPlan && (
        <div className="text-center mt-8">
          <h2 className="text-xl font-semibold mb-4">Proceso de pago para: {selectedPlan.title}</h2>
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}
    </div>
  );
}