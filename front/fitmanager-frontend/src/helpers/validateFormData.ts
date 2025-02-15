import { IUpdateDataForm } from "@/app/(Dashboard)/dashboard/user/data/updatedata/UpdateData";

export interface ValidationUserErrors {
  [key: string]: string | undefined;
  name?: string;
  birthdate?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
}

export const validateFormData = (formData: IUpdateDataForm): ValidationUserErrors => {
  const errors: ValidationUserErrors = {};

  if (!formData.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
    errors.name = "El nombre solo puede contener letras y espacios.";
  }
  if (!formData.birthdate) {
    errors.birthdate = "La fecha de nacimiento es obligatoria.";
  } else {
    const birthDate = new Date(formData.birthdate);
    const today = new Date();
    const currentYear = today.getFullYear();
    const birthYear = birthDate.getFullYear();
    if (currentYear - birthYear < 15) {
      errors.birthdate =`Debes tener o cumplir 15 años en el ${currentYear} para acceder al gimnasio.`;
    }
  }

  if (!formData.phone.trim()) {
    errors.phone = "El teléfono es obligatorio.";
  } else if (!/^\d{10,15}$/.test(formData.phone)) {
    errors.phone = "El teléfono debe tener entre 10 y 15 dígitos numéricos.";
  }

  if (!formData.address.trim()) {
    errors.address = "La dirección es obligatoria.";
  }

  if (!formData.city.trim()) {
    errors.city = "La ciudad es obligatoria.";
  }

  if (!formData.country.trim()) {
    errors.country = "El país es obligatorio.";
  }

  return errors;
};
