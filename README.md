# SÍNTESIS VIVA 🌟
### Motor de Storytelling Socioeconómico y Acción Colectiva

> **Área temática:** Sociedad y economía  
> **Desafío:** Dificultad para transformar información dispersa en información útil  
> **Stack Oficial:** JavaScript (ES6+), Express, Express-Validator, React (JSX), Tailwind CSS, Vite  
> **Hackathon:** Edición Especial de Innovación e Impacto Social 2026

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e.svg)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Express](https://img.shields.io/badge/Backend-Express_4.21-000000.svg)](https://expressjs.com/)
[![Express-Validator](https://img.shields.io/badge/Validation-Express--Validator_7.2-crimson.svg)](https://express-validator.github.io/)
[![React](https://img.shields.io/badge/Frontend-React_18.3-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite_6.0-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS_3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 📌 1. Visión y Problemática

En nuestros barrios, pequeños comercios, familias, comedores e instituciones públicas generan todos los días datos fragmentados en formatos incompatibles:
* **Audios y chats de WhatsApp:** Quejas de comerciantes sobre aumentos de fletes y desabastecimiento.
* **Planillas y libretas de mostrador:** Registros de ventas donde la inflación enmascara márgenes reales negativos y la deuda vecinal ("fiado") se acumula sin control.
* **Estadísticas de Datos Abiertos y Boletines Municipales:** Partidas millonarias de reactivación económica que vencen sin ejecutarse (más del 65%) porque las pymes no tienen balances auditados individuales.
* **Actas de Asambleas Vecinales:** Reuniones deliberativas que culminan en frustración por falta de datos estructurados para peticionar formalmente.

**Síntesis Viva** es una plataforma de **Inteligencia Colectiva y Storytelling Causal** que ingesta este caos multifuente y lo traduce en:
1. **Relato Humano en 4 Actos** (Doña Marta y el Pan Invisible).
2. **Grafo Causal con Modelos Relacionales** (Actores 1:N Señales 1:N Fuentes).
3. **Eliminación Lógica (Soft Delete)** con auditoría y restauración.
4. **Simulador 'What-If'** de compra colectiva y garantías solidarias.
5. **Generador Polimórfico de Decisiones** (Dossier Técnico Municipal, Audio de WhatsApp Barrial y Playbook para Comerciantes).

---

## 🏗️ 2. Arquitectura del Repositorio (JavaScript + React + Vite + Express)

```bash
sintesis-viva/
├── package.json                       # Scripts globales de ejecución y pruebas
├── README.md                          # Documentación ejecutiva del proyecto
├── server/                            # BACKEND: Node.js + Express
│   ├── package.json
│   ├── src/
│   │   ├── index.js                   # Servidor Express y montaje de rutas
│   │   ├── models/
│   │   │   └── db.js                  # Modelos relacionales con Soft Delete
│   │   ├── middlewares/
│   │   │   └── validator.js           # Validaciones con express-validator
│   │   ├── controllers/
│   │   │   ├── storyController.js     # Metodología de Storytelling en 4 Actos
│   │   │   ├── senalesController.js   # CRUD relacional, Soft Delete y Restore
│   │   │   ├── causalController.js    # Grafo de correlaciones cruzadas
│   │   │   ├── simulatorController.js # Modelo matemático 'What-If'
│   │   │   └── exportController.js    # Adaptador polimórfico tri-partita
│   │   └── routes/
│   │       └── api.js                 # Definición de rutas RESTful
│   └── tests/
│       └── api.test.js                # Suite automatizada de pruebas backend
├── client/                            # FRONTEND: Solo JavaScript + React + Tailwind + Vite
│   ├── package.json
│   ├── vite.config.js                 # Configuración de Vite con proxy hacia /api
│   ├── tailwind.config.js             # Configuración de estilos y dark mode
│   ├── postcss.config.js
│   ├── index.html                     # HTML raíz
│   └── src/
│       ├── main.jsx                   # Punto de entrada de React
│       ├── App.jsx                    # Contenedor principal y navegación
│       ├── index.css                  # Estilos globales y utilidades Tailwind
│       └── components/
│           ├── StorytellingView.jsx   # 4 Actos narrativos y grupos afectados
│           ├── IngestaRelacionalView.jsx # CRUD, express-validator y Soft Delete
│           ├── GrafoCausalView.jsx    # Visualización de nodos y patrones
│           ├── SimuladorView.jsx      # Controles 'What-If' y comparativas
│           └── ExportadorView.jsx     # Exportación polimórfica (Dossier, WhatsApp, Playbook)
└── docs/                              # Documentación estratégica
    ├── METODOLOGIA_STORYTELLING.md    # Marco narrativo profundo
    ├── ARQUITECTURA_TECNICA.md        # Diagramas de flujo y modelos
    ├── PROPUESTA_DE_VALOR.md          # Factores diferenciales para la hackathon
    └── PITCH_DECK_HACKATHON.md        # Guión de pitch (3 min), Q&A y Canvas
```

---

## 🚀 3. Inicio Rápido en 2 Pasos

### Prerrequisitos
Tener instalado Node.js 18+ (disponible en el sistema).

### 1. Iniciar el Servidor de Producción (Express + React Compilado):
```bash
npm start
```
Abre tu navegador en: **`http://localhost:5000`**

### 2. Modo Desarrollo (Hot-Reloading):
En dos terminales separadas:
```bash
# Terminal 1: Servidor Express con auto-reload
npm run dev:server

# Terminal 2: Cliente React con Vite (puerto 3000 con proxy a :5000)
npm run dev:client
```

### 3. Ejecutar Pruebas Automatizadas:
```bash
npm test
```

---

## 🛡️ 4. Características de Ingeniería Destacadas

* **Express-Validator:** Middleware estricto que valida longitudes, tipos de datos y rangos de porcentaje (`0-100%`), devolviendo respuestas estructuradas `400 Bad Request` en caso de error.
* **Eliminación Lógica (Soft Delete):** Ningún registro comunitario sensible se destruye permanentemente. Se marcan como `isDeleted: true` con marca de tiempo `deletedAt`, permitiendo consultas activas o auditorías históricas con opción de restauración (`PATCH /api/senales/:id/restore`).
* **Relaciones entre Modelos:** Modelado relacional que vincula cada señal a un **Actor Territorial** (Doña Marta, Cooperativa, Municipio) y una **Fuente de Dato** (WhatsApp, CSV, Datos Abiertos, Asambleas).
* **React + Vite + Tailwind (Solo JS):** Interfaz ultrarrápida, sin TypeScript, con diseño Dark Glassmorphism, animaciones y componentes desacoplados.

---

## 💎 5. Propuesta de Valor Única

> **"Transformar el ruido disperso de las economías barriales en un relato causal humano y un plan de acción colectiva medible, cerrando la brecha entre la angustia comunitaria y los recursos del Estado."**
