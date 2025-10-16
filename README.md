# CronoClase 

Proyecto de ejemplo llamado "CronoClase" — un prototipo de aplicación web para manejo básico de usuarios, inicio de sesión y paneles de calendario/seguimiento. Este README explica el objetivo general, estructura del repositorio y el propósito de los bloques de código más importantes.

## Objetivo general

El proyecto es una interfaz front-end estática (HTML/CSS/JS) que permite:
- Registrar usuarios mediante un modal de registro.
- Iniciar sesión usando correo y contraseña.
- Redirigir a paneles de la aplicación (calendario, vista de estudiantes, paneles de evaluación) en páginas separadas dentro del directorio `cronoClase-app/public`.

El propósito es servir como prototipo para integrar una API (por ejemplo MockAPI o una API REST propia) donde los formularios envíen y consulten datos reales.

## Estructura del repositorio

- `index.html` - Página principal (login + modal de registro).
- `cronoClase-app/src/` - Carpeta principal de código fuente del frontend.
	- `main.js` - Punto de entrada tipo ES module que inicializa listeners de la app.
	- `scripts/` - Scripts JS que contienen la lógica de interacción:
		- `inicioSesion.js` - Lógica del formulario de inicio de sesión (validaciones, consultas a la API, redirección).
		- `formularioRegistro.js` - Lógica del modal de registro (validaciones, envío POST a la API, mensajes UI).
		- `calendario.js`, `MostrarTareas.js`, `nav-active.js` - Scripts auxiliares para paneles internos.
	- `styles/` - Hojas de estilo CSS usadas por la página (login, calendar, responsive, etc.).
	- `assets/` - Imágenes y recursos estáticos.
- `cronoClase-app/public/` - Vistas públicas/plantillas de paneles (calendarStudent, assessment panels, etc.).

## Cómo abrir y probar (local)

1. Abrir `index.html` en tu navegador (doble-clic o `File > Open` en el navegador).
2. Para ver la interacción con APIs externas, asegúrate de que las URLs dentro de `cronoClase-app/src/scripts/formularioRegistro.js` y `inicioSesion.js` apunten a tu API o a un servicio de pruebas (ej. MockAPI). Estas variables están declaradas como `API_URL` dentro de cada archivo.
3. Abrir herramientas de desarrollo (F12) para ver la consola y verificar errores de red o importación de módulos.

Nota: el proyecto usa módulos ES. `index.html` carga `cronoClase-app/src/main.js` como `<script type="module">`; asegúrate de abrir el archivo desde un servidor local (opcional) si encuentras errores de CORS o importación.

## Explicación por bloques de código clave

### `index.html`
- Estructura:
	- Head: incluye Bootstrap CSS desde CDN y estilos personalizados (`style_log_In.css`).
	- Cuerpo: título, formulario de login, y modal de registro.
	- Mensajes: contiene `#mensajeLogin` (mensaje general del login) y `#mensajeRegistro` (mensaje del modal de registro). Estos son divs que el JS actualiza (clases `alert alert-...`).
	- Scripts: carga `bootstrap.bundle` y el archivo de entrada `cronoClase-app/src/main.js` como módulo.

Propósito: centralizar la UI de autenticación y proporcionar hooks (IDs) para que los scripts JS actúen sobre los formularios.

### `cronoClase-app/src/main.js`
- Propósito: archivo de arranque que importa e inicializa los módulos principales de la aplicación.
- Código esperado:
	- import { initRegistro } from './scripts/formularioRegistro.js'
	- import { initLogin } from './scripts/inicioSesion.js'
	- document.addEventListener('DOMContentLoaded', () => { initRegistro(); initLogin(); })

Esto asegura que los listeners se adjunten una vez el DOM esté listo.

### `cronoClase-app/src/scripts/inicioSesion.js`
- Propósito: manejar el envío del formulario de login y las validaciones.
- Puntos clave:
	- Busca el formulario con `id="formLogin"` y añade un listener `submit`.
	- Valida campos vacíos.
	- Consulta la API (por ejemplo: `API_URL?correo=<email>`) para buscar el usuario.
	- Si no existe usuario muestra un mensaje en `#mensajeLogin`.
	- Si existe, compara la contraseña y redirige al panel (ej: `calendarStudent.html`) en caso de éxito.
	- Guarda el correo en `localStorage` si el usuario marcó "Guardar datos".

### `cronoClase-app/src/scripts/formularioRegistro.js`
- Propósito: controlar el modal de registro y enviar los datos del nuevo usuario a la API.
- Puntos clave:
	- Busca el formulario `formRegistro` y añade `submit`.
	- Valida que las contraseñas coincidan.
	- Construye un objeto con los campos: `nombreCompleto`, `cedula`, `telefono`, `fechaNacimiento`, `genero`, `rol`, `correo`, `contrasena`.
	- Envía un `POST` a la API (`API_URL`) con `Content-Type: application/json`.
	- Muestra mensajes de éxito/error en el contenedor `#mensajeRegistro` (clases Bootstrap `alert`).
	- Cierra el modal de Bootstrap al registrarse y limpia el formulario.

### Mensajes UI en lugar de alert()
- En esta versión los scripts actualizan `#mensajeLogin` y `#mensajeRegistro` con clases `alert alert-success|danger|warning` para mostrar feedback sin modales del navegador.

## Ajustes comunes que podrías necesitar

- Cambiar las URLs `API_URL` en los scripts si tienes una API propia.
- Si abres los archivos directamente con `file://` y ves problemas con `type="module"` o imports, prueba ejecutando un servidor local sencillo:

	- Con Python 3:

		```powershell
		python -m http.server 8000
		```

	- Luego abre: `http://localhost:8000/index.html` en el navegador.

## Buenas prácticas y próximos pasos

- Añadir validaciones más robustas del lado cliente (formato de correo, longitud de contraseña).
- Usar HTTPS y manejar tokens/SESIONES de forma segura si se integra con backend real.
- Añadir tests unitarios y end-to-end para flujos de login/registro.
- Convertir a un pequeño bundler (Vite/Parcel) si se va a escalar, para manejar imports, assets y entorno de desarrollo.

Si quieres, puedo:
- Añadir ejemplos concretos de payloads JSON esperados por la API.
- Crear un pequeño script de prueba (curl/PowerShell) para probar registro/login contra MockAPI.
- Expandir la documentación con diagramas de flujo o un diagrama de carpetas más detallado.

---
README generado automáticamente y adaptado al estado actual del proyecto. Si quieres que incluya ejemplos de requests/responses o instrucciones de despliegue, dime qué API usarás y lo añado.