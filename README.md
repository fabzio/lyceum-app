# Lyceum
Sistema de Gestión Académica Universitaria con módulos de:

📝 **Tesis**
Gestiona todo el ciclo de vida de las tesis estudiantiles.

Crear y revisar tesis: Registro y seguimiento de tesis.

Aprobaciones: Flujo de validación en tres etapas.

Jurados: Solicitud, asignación y consulta de jurados.

Reportes: Generación y descarga de reportes relacionados con tesis.

🎓 **Procesos de estudiantes**
Monitorea y gestiona situaciones académicas de los estudiantes.

Estudiantes en riesgo: Carga, seguimiento y reportes de estudiantes en situación académica delicada.

Cartas de presentación: Generación y aprobación de cartas para prácticas, intercambios, etc.

Administración estudiantil: Gestión de JP (jefes de práctica) y delegados.

📘 **Planes de estudio**
Módulo académico para administrar carreras, cursos y planes curriculares.

Planes y cursos: Visualización y edición de planes de estudio y los cursos que los componen.

🗓️ **Matrícula**
Soporte al proceso de matrícula y asignación de horarios.

Matrícula adicional: Solicitud y revisión.

Horarios: Gestión y revisión de propuestas, además de asignación de docentes.

Profesores: Consulta de profesores asignados a horarios.

👥 **Usuarios**
Administración de perfiles del sistema.

Estudiantes, profesores, administrativos y externos: Crear y visualizar cada tipo de usuario según su rol en la institución.

🔐 **Seguridad**
Control de accesos y permisos del sistema.

Roles y permisos: Creación, asignación y visualización de roles y permisos a usuarios.

❓ **Preguntas frecuentes**
Módulo de ayuda para usuarios del sistema.

Gestión de preguntas frecuentes: Creación, administración y sugerencias de los usuarios.

📄 **Contratación**
Gestiona el proceso de contratación docente.

Cuenta y contacto: Registro y actualización de datos del postulante.

Solicitudes de empleo: Creación, seguimiento y eliminación de postulaciones.

Procesos de contratación: Creación, apertura, evaluación, y selección de candidatos por fases.

Roles en contratación: Asignación de revisores, selectores y evaluadores por curso.

🏛️ Unidades
Información organizacional de la universidad.

Gestión institucional: Visualización y edición de datos sobre universidades, facultades, departamentos, secciones, áreas y especialidades.

📊 **Encuestas**
Herramienta para la retroalimentación institucional.

Encuestas: Creación, visualización, respuesta y análisis de resultados de encuestas académicas o administrativas.

## Previsualización del Módulo de Tesis
<img width="1225" height="681" alt="image" src="https://github.com/user-attachments/assets/555ca594-7ecf-4ce8-9899-638600110ecf" />

# Desarrollo
Welcome to your new Bun project! This project is a REST API using Bun + Hono + MongoDB + TypeScript providing a powerful and efficient platform with a simple CRUD interface for a user model.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installations](#installations)
  - [Configuration](#configuration)
  - [Routes](#routes)
  - [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started

Before you begin, make sure you have the following installed:

- [Bun](https://bun.sh)
- [MongoDB](mongodb.com) or [MongoCompass](mongodb.com/products/compass)

### Installations:

1. Clone this repository to your local machine

```bash
git clone https://github.com/ProMehedi/bun-hono-rest-api.git
```

2. Navigate to the project directory

```bash
cd bun-hono-rest-api
```

3. Install dependencies

```bash
bun install
```

To run:

```bash
bun run dev
```

### Configuration

Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:

```
PORT=9000
MONGO_URI=mongodb://localhost:27017/bun-hono-rest-api
JWT_SECRET=secret
```

### Routes

```
POST /api/v1/users (Create User)
POST /api/v1/users/login (Login User)
GET /api/v1/users/profile (Get User Profile)
GET /api/v1/useres (Get All Users)
GET /api/v1/users/:id (Get User By Id)
```

### Usage

```
POST /api/v1/users (Create User)
```

```json
{
  "name": "Mehedi Hasan",
  "email": "mehedi@example.com",
  "password": "123456"
}
```

```
POST /api/v1/users/login (Login User)
```

```json
{
  "email": "mehedi@example.com",
  "password": "123456"
}
```

```
GET /api/v1/users/profile (Get User Profile)
Authorisation Header (Bearer Token)
```

```
GET /api/v1/useres (Get All Users)
Authorisation Header (Bearer Token)
```

```
GET /api/v1/users/:id (Get User By Id)
Authorisation Header (Bearer Token)
```

## Project Structure

```

├── .vscode
│ ├── settings.json
├── config
│ ├── db.ts
├── controllers
│ ├── user.ts
├── middlewares
│ ├── authMiddlewares.ts
│ ├── errorMiddlewares.ts
├── models
│ ├── userModels.ts
├── routes
│ ├── userRoutes.ts
├── utils
│ ├── getToken.ts
├── server.ts
├── .env
├── .gitignore
├── bun.lockb
├── README.md
├── package.json
├── tsconfig.ts

```

## Contributing

We welcome contributions to improve the API! If you find a bug, have a feature request, or want to suggest improvements, please create an issue in the GitHub repository. If you'd like to contribute code, feel free to fork the repository, create a new branch, commit your changes, and open a pull request.

Please ensure that your code follows the existing coding style and conventions.

## License

This project is licensed under the [MIT] License

## Contact

If you have any questions or need further assistance, you can reach us at [Mehedi Hasan](fb.com/promehedi).
