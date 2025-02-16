# FitManager 

## 🚀 Instalación y Configuración

### 🔧 Requisitos
- [Node.js](https://nodejs.org/) (versión recomendada: 18 o superior)
- [PostgreSQL](https://www.postgresql.org/) (versión 12 o superior)
- [Google Cloud Console](https://console.cloud.google.com/) (para autenticación)
- [Cloudinary](https://cloudinary.com/) (para almacenamiento de imágenes)
- [MercadoPago](https://www.mercadopago.com/) (para pagos)

## 📦 Backend

### 🔹 Instalación
```bash
cd backend
npm install
```

### 🛠 Configuración
1. Copiar el archivo `.env.example` como `.env` y completar las variables de entorno.
2. Asegurar que PostgreSQL está corriendo y configurado en `.env`.
3. Configurar credenciales de Google Cloud para autenticación.

### ▶️ Ejecutar
```bash
npm start
```

## 🎨 Frontend

### 🔹 Instalación
```bash
cd frontend
npm install
```

### 🛠 Configuración
1. Copiar el archivo `.env.local.example` como `.env.local` y completar las variables de entorno.
2. Asegurar que la API_URL en `.env.local` apunta al backend.

### ▶️ Ejecutar
```bash
npm run dev
```

## 🔗 Tecnologías Utilizadas
- **Backend:** NestJS, PostgreSQL, Cloudinary, MercadoPago, Google Cloud Auth
- **Frontend:** Next.js, TailwindCSS, Stripe, Axios


