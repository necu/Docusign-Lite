<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/file-signature.svg" alt="DocuSign Lite Logo" width="120" />

  # 📝 DocuSign Lite
  **Generador de documentos formales, seguros y 100% Client-Side**

  [![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  <br />

  [![⭐ Star us on GitHub](https://img.shields.io/github/stars/DocuSignLite/docusign-lite?style=social)](https://github.com/DocuSignLite/docusign-lite)
  
  Si este proyecto te ha resultado útil, **¡dános una estrella en GitHub!** 🌟  
  Tu apoyo nos ayuda a seguir mejorando y creando software libre.

  <br />
</div>

---

**DocuSign Lite** es una plataforma Open Source moderna, diseñada para empresas y particulares que necesitan redactar, firmar y generar documentos formales en PDF de forma instantánea. Su arquitectura garantiza que **ningún dato salga de tu ordenador**, procesando tanto el texto como tu firma criptográfica en el navegador (*Client-Side Rendering*).

<br/>

## 📸 Screenshots & UI

<div align="center">
  <img src="https://via.placeholder.com/1000x500.png?text=Dashboard+Principal+y+Vista+Previa+A4" alt="Dashboard Principal" width="100%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <p><em>Interfaz intuitiva con vista previa en tiempo real en formato A4 y renderizado multipágina.</em></p>
</div>

<div align="center">
  <img src="https://via.placeholder.com/1000x500.png?text=Panel+de+Firma+Avanzado+y+Multicapa" alt="Modal de Firma" width="100%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <p><em>Panel de firma avanzado con múltiples capas, trazos estilizados y almacenamiento local encriptado.</em></p>
</div>

---

## ✨ Características Principales

- 🛡️ **Privacidad Absoluta (Zero-Trust):** Toda la información ingresada y la firma generada se procesan en tu navegador. **Sin bases de datos, sin servidores, sin fugas de datos.**
- 📄 **Motor PDF Avanzado:** Generación dinámica de PDFs con soporte para múltiples páginas (`html-to-image` + `jsPDF`), manteniendo las dimensiones exactas del formato A4.
- 🖋️ **Firma Digital Encriptada:** Panel de dibujo interactivo multicapa (`signature_pad`). Tus trazos se estilizan, suavizan y se almacenan en el almacenamiento local de tu navegador encriptados con AES (`crypto-js`).
- 🌍 **Soporte Multilingüe (i18n):** Interfaz y plantillas disponibles en Español, Inglés, Alemán, Francés y Chino (Mandarín).
- 🏷️ **Sello QR de Verificación:** Cada página generada incluye un código QR y un sello de página para dar mayor validez corporativa al documento impreso.
- 🎨 **Diseño Minimalista & UX:** Componentes pulidos con Tailwind CSS y feedback visual con transiciones e iconografía premium (`lucide-react`).

---

## 🚀 Guía de Instalación y Uso (Para Todo el Mundo)

Si quieres ejecutar **DocuSign Lite** en tu propio ordenador, o usarlo como base para tus proyectos, sigue estos sencillos pasos.

### 1️⃣ Requisitos Previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/es/) (versión 18 o superior) en tu ordenador.

### 2️⃣ Clonar el Proyecto
Abre tu terminal y descarga el código fuente directamente desde GitHub:
```bash
git clone https://github.com/DocuSignLite/docusign-lite.git
cd docusign-lite
```

### 3️⃣ Instalar Dependencias
Instala todas las librerías necesarias para que el proyecto funcione:
```bash
npm install
```

### 4️⃣ Arrancar el Servidor Local
Ejecuta el siguiente comando para ver la aplicación corriendo en tu navegador en vivo:
```bash
npm run dev
```
👉 Abre [http://localhost:3000](http://localhost:3000) o la ruta que indique la terminal. Cualquier cambio que hagas en el código se reflejará instantáneamente.

### 5️⃣ Compilar para Producción (Para Subir a Internet)
Si quieres subir esta app a tu propio servidor (Vercel, Netlify, AWS, etc.):
```bash
npm run build
```
Esto generará una carpeta `dist` con archivos estáticos altamente optimizados, listos para desplegar en cualquier hosting web básico.

---

## 🌐 Despliegue en GitHub Pages

El repositorio incluye un workflow que compila la aplicación con la ruta correcta del
repositorio y publica la carpeta `dist` en GitHub Pages.

1. En GitHub, abre **Settings** → **Pages**.
2. En **Build and deployment**, selecciona **GitHub Actions** como fuente.
3. Haz push a la rama `main` o ejecuta manualmente el workflow **Deploy to GitHub Pages** desde la pestaña **Actions**.

La aplicación quedará disponible en `https://necu.github.io/Docusign-Lite/`. Si se
configura un dominio personalizado, el workflow adapta la ruta base automáticamente.

---

## 📖 Cómo usar la Plataforma

Usar **DocuSign Lite** es tan sencillo como rellenar un formulario:

1. **Selecciona un Documento:** Elige entre múltiples plantillas (Baja voluntaria, Excedencia, Vacaciones, etc.).
2. **Rellena los Datos:** Completa los campos en el menú izquierdo (Nombre, DNI, Empresa, Fechas). Verás cómo el documento de la derecha se actualiza al instante.
3. **Ajusta el Texto:** Puedes modificar el texto principal a tu gusto. Haz clic en las etiquetas (+ Fecha, + Nombre) para insertar variables dinámicas que se rellenarán automáticamente.
4. **Firma el Documento:** Haz clic en el área de firma y dibuja tu rúbrica. Puedes usar diferentes "capas" (por si quieres juntar un sello y una firma), y se guardará de forma segura en tu navegador para futuros documentos.
5. **Descarga tu PDF:** Haz clic en el botón superior derecho de **Generar PDF** y obtendrás un archivo perfecto para imprimir o enviar por correo electrónico.

---

## 🛠️ Arquitectura Técnica y Extensibilidad

Este proyecto se ha diseñado para ser el **boilerplate perfecto** para crear generadores de documentos. Está construido pensando en la modularidad:

- **`src/data/templates.ts`**: El cerebro de las plantillas. **¿Quieres añadir un contrato nuevo?** Simplemente añade un objeto aquí:
  ```typescript
  {
    id: 'contrato_alquiler',
    name: 'Contrato de Alquiler',
    title: 'Contrato de Arrendamiento Urbano',
    recipient: 'Propietario:',
    fields: ['address', 'rentAmount'], // Campos dinámicos requeridos
    bodyText: 'Por la presente, se establece el alquiler de {{address}} por {{rentAmount}} mensuales...'
  }
  ```
  La interfaz creará automáticamente los campos y las etiquetas de autocompletado basándose en este archivo.

- **`src/utils/pdfGenerator.ts`**: Lógica de conversión de DOM a PDF con algoritmos de cálculo para **multipaginación automática**. Divide correctamente el contenido si excede el largo de una hoja A4.
- **`src/components/SignatureModal.tsx`**: Un complejo canvas superpuesto que maneja múltiples referencias, cifrado AES-256 (`crypto-js`) y exportación Alpha-Channel (fondos transparentes) con `signature_pad`.

---

## 🤝 Contribuciones

**¡El código abierto vive de la comunidad!** 
Si se te ocurren nuevos modelos de documentos (p. ej. *contratos de confidencialidad, cesión de imagen, recibos, etc.*), o mejoras arquitectónicas, eres más que bienvenido a participar.

1. Haz un **Fork** del repositorio.
2. Crea una rama para tu feature: `git checkout -b feature/NuevoDocumento`
3. Haz un commit de tus cambios: `git commit -m 'Añadido nuevo contrato comercial'`
4. Sube la rama: `git push origin feature/NuevoDocumento`
5. Abre un **Pull Request**.

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Es un software de código abierto de uso y distribución libre (gratuito, comercial o privado). 

**La única condición para su uso o modificación** es el nombramiento y atribución a este proyecto original, manteniendo el aviso de copyright y la licencia en cualquier copia o porción sustancial del software (tal y como especifica el archivo `LICENSE`).

<br/>
<div align="center">
  <p>Desarrollado con ❤️ y código abierto.</p>
  <p><strong><a href="https://github.com/DocuSignLite/docusign-lite">⭐ No olvides darnos una estrella en GitHub ⭐</a></strong></p>
</div>