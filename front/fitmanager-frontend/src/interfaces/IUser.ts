export interface IUser {
    id_user: string;
    name: string;
    email: string;
    password: string;
    rol: number;
    birthdate: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    isActive: boolean;
    id_rol: number;
    entry_date: Date;
    imgUrl: string;
  }