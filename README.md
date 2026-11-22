# jef-mcp

**jef-mcp** es un servicio backend modular construido en TypeScript que expone capacidades a través de **MCP (Model Context Protocol)**, un servidor **HTTP REST**, y un proceso **Cron** para la ingesta y procesamiento de correos electrónicos vía POP3.

## 🚀 Características Principales

* **Servidor MCP (`start:mcp`):** Expone herramientas (tools) e integraciones mediante `@modelcontextprotocol/sdk` para conectarse con modelos de IA (como Claude, Gemini o plataformas compasivas de LLM).

* **Servidor HTTP (`start:http`):** API REST impulsada por Express 5 para atender peticiones web o integraciones de clientes/webhooks.

* **Cron / Procesador de Mail (`start:cron`):** Servicio programado que descarga correos electrónicos mediante POP3 (`node-pop3`) y parsea su contenido estructurado (`mailparser`).

* **Migraciones de Base de Datos (`database:migrate` / `database:rollback`):** Scripts dedicados para la gestión de esquema y migraciones de datos.

## 🛠️ Tecnologías Utilizadas

* **Lenguaje & Entorno:** Node.js (CommonJS / TypeScript con `tsx`)

* **Protocolo MCP:** `@modelcontextprotocol/sdk`

* **API Web:** `express` (v5)

* **Ingesta de Emails:** `node-pop3` & `mailparser`

* **Validación de Datos:** `zod`

## 📋 Requisitos Previos

* **Node.js:** `>= 18.0.0`

* **npm:** `>= 9.0.0`

## ⚙️ Instalación

1. Clonar el repositorio:

   ```
   git clone <URL_DEL_REPOSITORIO>
   cd jef-mcp
   
   ```

2. Instalar las dependencias:

   ```
   npm install
   
   ```

3. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto (basado en `.env.example` si existe) con las credenciales necesarias (base de datos, servidor POP3, claves de API, etc.):

   ```
   # Ejemplo de variables de entorno
   PORT=3000
   DATABASE_URL=...
   POP3_HOST=...
   POP3_USER=...
   POP3_PASSWORD=...
   
   ```

## 💻 Comandos Disponibles

### Base de Datos

* **Ejecutar migraciones:**

  ```
  npm run database:migrate
  
  ```

* **Revertir última migración:**

  ```
  npm run database:rollback
  
  ```

### Servicios

* **Iniciar Servidor MCP:**

  ```
  npm run start:mcp
  
  ```

* **Iniciar API HTTP:**

  ```
  npm run start:http
  
  ```

* **Iniciar Cron de Correos (POP3):**

  ```
  npm run start:cron
  
  ```

## 📁 Estructura del Proyecto

```
.
├── src/
│   ├── cmd/
│   │   ├── database/
│   │   │   ├── migrate.ts
│   │   │   └── rollback.ts
│   │   ├── http/
│   │   │   └── server.ts
│   │   ├── mail_cron/
│   │   │   └── cron.ts
│   │   └── mcp/
│   │       └── server.ts
│   ├── ports/
│   ├── usecases/
│   └── ...
├── package.json
└── README.md

```

## 📄 Licencia

ISC