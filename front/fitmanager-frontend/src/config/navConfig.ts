export interface INavConfig {
    id: number;
    name: string;
    href: string;
    private: boolean;
  }
  export const navConfig : INavConfig[] = [
    {
      id: 1,
      name: "Inicio",
      href: "/home",
      private: false,
    },
    {
      id: 2,
      name: "Planes",
      href: "/plans",
      private: false,
    },
    {
      id: 3,
      name: "Sobre Nosotros",
      href: "/aboutus",
      private: false,
    },
    {
      id: 4,
      name: "Contacto",
      href: "/contact",
      private: false,
    },
  
  ];