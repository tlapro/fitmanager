type QuestionNode = {
    question?: string;
    options?: { [key: string]: string };
    message?: string;
};

const chatbotFlow: { [key: string]: QuestionNode } = {
    start: {
        question: "¡Hola! ¿En qué puedo ayudarte?",
        options: {
            "Quiero saber mi experiencia en el gimnasio": "pregunta1",
            "¿A qué hora abre el gimnasio?": "horario",
            "¿Cuánto cuesta la cuota?": "cuotas",
            "¿Cuál es la dirección del gimnasio?": "direccion"
        }
    },

    horario: {
        message: "Lunes a Viernes: **6:00 AM - 10:00 PM**, <br /> Sábado: **10:00 AM - 6:00 PM**, <br /> Domingo: **Cerrado**"
    },

    cuotas: {
        question: "Aquí están las opciones de membresías:",
        options: {
            "Básico": "basico",
            "Pro": "pro",
            "Avanzado": "avanzado",
        },
    },
    basico: {
        question: `Básico: $25,000/mes </br> Servicios: </br>• Acceso al Gimnasio </br>• Asistencia Pasiva </br>• Registro de avances`,
    },
    pro: {
        question: `Pro: $50,000/mes </br> Servicios: </br>• Acceso al Gimnasio </br>• Asistencia Pasiva </br>• Registro de avances </br>• Plan de entrenamiento`,
    },
    avanzado: {
        question: `Avanzado: $75,000/mes </br> Servicios: </br>• Acceso al Gimnasio </br>• Asistencia Activa </br>• Registro de avances </br>• Plan de entrenamiento </br>• Plan dietético`,
    },

    direccion: {
        message: "Nos encontramos en **Calle Falsa 123, Ciudad, País**."
    },

    pregunta1: {
        question: "¿Cuánto tiempo has ido a un gimnasio con regularidad?",
        options: {
            "Menos de 3 meses": "pregunta2",
            "Entre 3 meses y 1 año": "pregunta3",
            "Más de 1 año": "pregunta4"
        }
    },
    pregunta2: {
        question: "¿Te sientes familiarizado/a con las máquinas y pesas del gimnasio?",
        options: {
            "No, casi no sé cómo usarlas": "pregunta6",
            "Sí, pero aún tengo dudas": "pregunta6",
            "Sí, me manejo bien": "pregunta7"
        }
    },
    pregunta3: {
        question: "¿Has seguido alguna rutina de entrenamiento con objetivos claros?",
        options: {
            "No, solo entrenaba sin un plan fijo": "pregunta6",
            "Sí, tenía una rutina estructurada": "pregunta5"
        }
    },
    pregunta4: {
        question: "¿Has entrenado con un entrenador personal alguna vez?",
        options: {
            "No, siempre he entrenado solo/a": "pregunta7",
            "Sí, he recibido asesoramiento de un entrenador": "pregunta5"
        }
    },
    pregunta5: {
        question: "¿Tienes experiencia con técnicas avanzadas como superseries, drop sets o periodización?",
        options: {
            "No, solo conozco lo básico": "pregunta7",
            "Sí, aplico estas técnicas en mis entrenamientos": "pregunta8"
        }
    },
    pregunta6: {
        question: "¿Cuántos ejercicios sueles hacer por grupo muscular en una sesión de entrenamiento?",
        options: {
            "1 o 2 ejercicios": "final1",
            "3 o 4 ejercicios": "pregunta7",
            "Más de 4 ejercicios": "pregunta8"
        }
    },
    pregunta7: {
        question: "¿Has realizado ejercicios compuestos como sentadilla, peso muerto y press de banca?",
        options: {
            "No, solo hago máquinas o ejercicios aislados": "final1",
            "Sí, pero con poco peso y técnica básica": "pregunta10",
            "Sí, los incluyo regularmente en mi entrenamiento": "pregunta8"
        }
    },
    pregunta8: {
        question: "¿Eres capaz de ajustar tu rutina de entrenamiento según tu progreso y objetivos?",
        options: {
            "No, siempre sigo la misma rutina": "final2",
            "Sí, cambio mi entrenamiento en función de mi progreso": "pregunta9"
        }
    },
    pregunta9: {
        question: "¿Controlas tus repeticiones y tiempos de descanso en cada serie?",
        options: {
            "No, entreno sin medir repeticiones ni tiempos": "final2",
            "Sí, sigo un plan con repeticiones y tiempos controlados": "pregunta11"
        }
    },
    pregunta10: {
        question: "¿Realizas calentamiento y estiramiento antes y después de entrenar?",
        options: {
            "No, nunca lo hago": "final1",
            "A veces, cuando tengo tiempo": "final2",
            "Sí, siempre incluyo calentamiento y estiramiento": "pregunta12"
        }
    },
    pregunta11: {
        question: "¿Sueles entrenar con buena técnica en cada ejercicio?",
        options: {
            "No, solo levanto peso sin preocuparme por la técnica": "final1",
            "Sí, pero me cuesta mantener la técnica con pesos altos": "final2",
            "Sí, priorizo la técnica sobre el peso levantado": "pregunta13"
        }
    },
    pregunta12: {
        question: "¿Llevas un registro de tu entrenamiento para medir progresos?",
        options: {
            "No, entreno sin llevar un control": "final2",
            "Sí, llevo un registro de mis cargas y repeticiones": "pregunta14"
        }
    },
    pregunta13: {
        question: "¿Entrenas también resistencia cardiovascular junto con pesas?",
        options: {
            "No, solo hago pesas": "final2",
            "Sí, complemento con cardio en mi rutina": "pregunta15"
        }
    },
    pregunta14: {
        question: "¿Has realizado entrenamientos de alta intensidad como HIIT?",
        options: {
            "No, solo entreno de manera convencional": "final2",
            "Sí, he realizado entrenamientos HIIT ocasionalmente": "pregunta15",
            "Sí, lo aplico regularmente en mi entrenamiento": "final3"
        }
    },
    pregunta15: {
        question: "¿Sabes diseñar una rutina de entrenamiento efectiva sin ayuda?",
        options: {
            "No, siempre sigo rutinas preestablecidas": "final2",
            "Sí, puedo armar mi propia rutina según mis objetivos": "final3"
        }
    },

    final1: {
        message: "Tu nivel de **experiencia en gimnasio es INICIAL**. Te recomendamos aprender lo básico sobre entrenamiento y máquinas antes de seguir un plan avanzado."
    },
    final2: {
        message: "Tu nivel de **experiencia en gimnasio es INTERMEDIO**. Ya tienes algo de conocimiento, pero podrías mejorar con una rutina más estructurada."
    },
    final3: {
        message: "Tu nivel de **experiencia en gimnasio es AVANZADO**. Ya dominas el entrenamiento y puedes enfocarte en optimizar tu rendimiento."
    }
};

export default chatbotFlow;
