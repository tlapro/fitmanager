import { useState } from "react";
import * as htmlToImage from "html-to-image";
import { IHealthsheet } from "@/interfaces/IHealthsheet";
import axios from "axios";
import { IUser } from "@/interfaces/IUser";
import { Toast } from "@/components/Toast/Toast";
import { useRouter } from "next/navigation";

export default function NewHealthsheet() {
  const router = useRouter();
  const [ok, setOk] = useState(false);
  const [formData, setFormData] = useState<IHealthsheet>({
    name: "",
    age: "",
    phone: "",
    emergencyContact: "",
    weight: "",
    height: "",
    preExistingDiseases: "",
    surgeries: "",
    allergies: "",
    currentMedications: "",
    chronicPain: "",
    additionalComments: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const autoResizeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'; 
    e.target.style.height = `${e.target.scrollHeight}px`; 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof IHealthsheet]) {
        newErrors[key] = `Este campo es obligatorio.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateImageAndUpload = async () => {
    if (!validateForm()) return;

    const formElement = document.getElementById("healthsheet-form");
    if (!formElement) return;

    try {
      const dataUrl = await htmlToImage.toPng(formElement, {
        style: {
          width: "100%",
          height: "auto",
          border: "1px solid #ccc",
          padding: "5px",
          boxSizing: "content-box",
        },
      });

      const imgBlob = dataURItoBlob(dataUrl);
      const uploadData = new FormData();
      uploadData.append("file", imgBlob);
      uploadData.append("upload_preset", "upload");
      uploadData.append("resource_type", "image");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        uploadData
      );

      const token = localStorage.getItem("token") || "";
      const user: IUser = JSON.parse(localStorage.getItem("user") || "{}");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/healthsheet`,
        {
          id_user: user.id_user,
          urlSheet: cloudinaryResponse.data.secure_url,
          isTemporary: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.fire({ icon: "success", title: "Ficha Médica creada con éxito." });
      router.push("/dashboard/user/healthsheet");
    } catch {
      Toast.fire({ icon: "error", title: "Error al crear la Ficha Médica." });
    }
  };


  function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: mimeString });
  }

  return (
    <div>
      <form id="healthsheet-form">
        <div className="p-6">
          <h1 className="text-2xl text-center font-bold mb-4">Nueva Ficha Médica</h1>
          <div className="glex gap-6">
            {[
              { label: "Nombre", name: "name" },
              { label: "Edad", name: "age" },
              { label: "Teléfono", name: "phone" },
              { label: "Contacto de Emergencia", name: "emergencyContact" },
              { label: "Peso (kg)", name: "weight" },
              { label: "Altura (cm)", name: "height" },
              { label: "Enfermedades preexistentes", name: "preExistingDiseases", textarea: true },
              { label: "Cirugías recientes", name: "surgeries", textarea: true },
              { label: "Alergias", name: "allergies", textarea: true },
              { label: "Medicamentos actuales", name: "currentMedications", textarea: true },
              { label: "Dolores crónicos", name: "chronicPain", textarea: true },
              { label: "Comentarios adicionales", name: "additionalComments", textarea: true }
            ].map(({ label, name, textarea }) => (
              <div key={name} className="mb-6">
                <label className="block font-medium">{label}:</label>
                {textarea ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    onInput={autoResizeTextArea} 
                    className="border p-3 w-full rounded resize-none" 
                  />
                ) : (
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="border p-3 w-full rounded"
                  />
                )}
                {errors[name] && <div className="text-red-600 text-sm">{errors[name]}</div>}
              </div>
            ))}
          </div>
        </div>
        <hr className="border-gray-200" />
        <div className="m-6 text-justify">
          <small className="text-gray-500">
            Al completar este formulario, el usuario declara bajo juramento que la información proporcionada es verdadera y precisa.
            El gimnasio se exime de cualquier responsabilidad por lesiones o problemas de salud derivados de la práctica de ejercicio físico,
            siendo el usuario el único responsable de su estado de salud y su capacidad para realizar actividades físicas.
            Se recomienda consultar con un profesional de salud antes de iniciar cualquier rutina de ejercicios.
          </small>
        </div>
        <hr className="border-gray-200" />
      </form>
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="mt-4 flex items-center justify-center">
        <input type="checkbox" onClick={!ok ? () => setOk(true) : () => setOk(false)} id="ok" name="ok" value="ok" 
        className="h-4 w-4 rounded border-gray-300 accent-black focus:ring-black checked:bg-black checked:border-black"/>
        <label htmlFor="ok" className="ml-2 text-sm font-medium text-gray-900">
          Estoy de acuerdo con la declaración de responsabilidad.
        </label>
        </div>
        <button
          onClick={generateImageAndUpload}
          className={`${!ok ? "w-1/2 opacity-20 cursor-not-allowed mt-6 bg-black text-white py-2 px-6 rounded" : "w-1/2 cursor:pointer mt-6 bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition duration-200"}`}
          disabled={!ok}
          
        >
          Generar Hoja de Salud
        </button>
      </div>
    </div>
  );
}
