"use client";
import { Toast } from "@/components/Toast/Toast";
import ToastConditional from "@/components/ToastConditional/ToastConditional";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner, FaUpload } from "react-icons/fa";

export default function AddRoutine() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      Toast.fire({ icon: "warning", title: "Por favor, selecciona un archivo." });
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "upload");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        Toast.fire({ icon: "success", title: "Imagen subida con éxito." });
      } else {
        throw new Error("Error al obtener la URL de la imagen.");
      }
    } catch {
      Toast.fire({ icon: "error", title: "Hubo un error al subir la imagen." });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedLevel || !imageUrl) {
      Toast.fire({ icon: "warning", title: "Selecciona un nivel y sube una imagen antes de guardar." });
      return;
    }

    const confirm = await ToastConditional({
      title: "¿Guardar rutina?",
      text: "¿Estás seguro de que quieres guardar esta rutina?",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "black",
    });

    if (!confirm) return;

    const token = localStorage.getItem("token");

    if (!token) {
      Toast.fire({ icon: "error", title: "No se encontró el token. Inicia sesión nuevamente." });
      return;
    }

    const routineData = { id_level: selectedLevel, url_imagen: imageUrl };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catalogo`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(routineData),
      });

      if (response.ok) {
        Toast.fire({ icon: "success", title: "Rutina agregada correctamente." });
        setSelectedLevel(null);
        setImageFile(null);
        setImageUrl(null);
        router.push("/dashboard/administration/coaches");
      } else {
        Toast.fire({ icon: "error", title: "Error al agregar la rutina." });
      }
    } catch {
      Toast.fire({ icon: "error", title: "Hubo un error al enviar la rutina." });
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 p-8 min-h-screen">
      <h1 className="text-2xl font-bold">Agregar Nueva Rutina</h1>

      <select
        className="border border-gray-300 rounded px-4 py-2 w-10/12 text-center text-gray-700 focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSelectedLevel(Number(e.target.value))}
        value={selectedLevel || ""}
      >
        <option value="" disabled>Selecciona un nivel</option>
        <option value="1">Nivel 1 - Inicial</option>
        <option value="2">Nivel 2 - Intermedio</option>
        <option value="3">Nivel 3 - Avanzado</option>
      </select>

      {!imageUrl && (
        <div className="w-10/12">
          <label className="w-full border border-gray-300 rounded p-2 flex items-center justify-between bg-white cursor-pointer file:hidden">
            <span className="text-gray-700">{imageFile ? imageFile.name : "Seleccionar archivo..."}</span>
            <FaUpload className="text-gray-500" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}

      {!imageUrl && (
        <button
          onClick={handleUpload}
          disabled={uploading || !imageFile}
          className={`px-6 py-2 rounded text-white font-semibold transition ${
            uploading || !imageFile ? "bg-gray-400" : "bg-black hover:bg-gray-900"
          }`}
        >
          {uploading ? <FaSpinner className="animate-spin inline-block" /> : "Subir Imagen"}
        </button>
      )}

      {imageUrl && (
        <div className="mt-4 text-center">
          <p className="text-gray-700 font-medium">Imagen subida:</p>
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-600 font-semibold hover:underline transition"
          >
            📷 Ver Imagen
          </a>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedLevel || !imageUrl}
        className={`px-6 py-2 rounded text-white font-semibold transition ${
          !selectedLevel || !imageUrl ? "bg-gray-400" : "bg-black hover:bg-gray-900"
        }`}
      >
        Guardar Rutina
      </button>
    </div>
  );
}
