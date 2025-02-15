import { IRegister } from "@/interfaces/IRegister";

export interface ValidationErrors {
    [key: string]: string;
  }
export const RegisterValidate = (formData: IRegister): ValidationErrors => {
    const errors: ValidationErrors = {};
    const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+ [A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;

    if (!formData.name) {
        errors.name = "El nombre es obligatorio";
    } else if (!regexName.test(formData.name.trim())) {
        errors.name = "El nombre debe incluir un nombre y apellido."
    }
    if (!formData.email.trim()) {
        errors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "El email no es válido.";
    }
    if (!formData.birthdate.trim()) {
        errors.birthdate = "La fecha de nacimiento es obligatoria.";
    }
    if (!formData.country.trim()) {
        errors.country = "El país es obligatorio.";
    }
    if (!formData.city.trim()) {
        errors.city = "La ciudad es obligatoria.";
    }
    if (!formData.address.trim()) {
        errors.address = "La dirección es obligatoria.";
    }

    if (!formData.phone.trim()) {
        errors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(formData.phone)) {
        errors.phone = "El teléfono debe contener solo números.";
    }

    if (!formData.password.trim()) {
        errors.password = "La contraseña es obligatoria.";
      } else if (formData.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres.";
      }
      if (!formData.confirmPassword.trim()) {
        errors.confirmPassword = "La confirmación de contraseña es obligatoria.";
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden.";
      }
    
      return errors;
}
export const validatePassword = (password: string): string | null => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (!hasUpperCase || !hasNumber) return "La contraseña debe incluir al menos una letra mayúscula y un número.";
    return null;
  };

  export const validateName = (name: string): string | null => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+ [A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
    return regex.test(name.trim())
      ? null
      : "El nombre debe incluir un nombre y un apellido.";
  };