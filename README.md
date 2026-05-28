# 📝 Gestor de Notas Premium

Una aplicación web moderna para gestionar tus notas con diseño elegante y funcionalidad completa.

## ✨ Características

- 📝 Crear, editar y eliminar notas
- 🔍 Buscar notas por título o contenido
- 🎨 Notas con colores automáticos
- 💾 Almacenamiento local (persiste en el navegador)
- 📱 Diseño responsivo
- ⚡ Construida con React + TypeScript + Vite

## 🚀 Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/gestor-notas.git
cd gestor-notas
```

2. **Instala las dependencias:**
```bash
npm install
# o con yarn
yarn install
```

3. **Inicia el servidor de desarrollo:**
```bash
npm run dev
# o con yarn
yarn dev
```

La aplicación se abrirá en `http://localhost:3000`

## 📦 Construcción para producción

```bash
npm run build
npm run preview
```

Esto generará la carpeta `dist` lista para desplegar.

## 🛠️ Estructura del Proyecto

```
gestor-notas/
├── src/
│   ├── App.tsx           # Componente principal
│   ├── App.css           # Estilos
│   └── main.tsx          # Punto de entrada
├── index.html            # HTML base
├── package.json          # Dependencias
├── vite.config.ts        # Configuración de Vite
├── tsconfig.json         # Configuración de TypeScript
└── README.md             # Este archivo
```

## 💡 Cómo usar

### Crear una nota
1. Haz clic en "+ Nueva" en la barra lateral
2. Escribe el título y contenido
3. Haz clic en "💾 Guardar"

### Editar una nota
1. Haz clic en una nota de la lista
2. Modifica el contenido
3. Haz clic en "💾 Guardar"

### Eliminar una nota
1. Selecciona la nota
2. Haz clic en "🗑️ Eliminar"

### Buscar notas
Escribe en el campo "Buscar notas..." para filtrar por título o contenido

## 🔗 Integración con Git

### Primeros pasos con Git

```bash
# Inicializar repositorio (si aún no está hecho)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Gestor de notas premium"

# Agregar repositorio remoto
git remote add origin https://github.com/tu-usuario/gestor-notas.git

# Hacer push a main
git branch -M main
git push -u origin main
```

### Flujo de trabajo típico

```bash
# Crear una rama para una nueva característica
git checkout -b feature/nueva-caracteristica

# Hacer cambios y commitear
git add .
git commit -m "Agregar nueva característica"

# Hacer push y crear pull request
git push origin feature/nueva-caracteristica
```

## 🎨 Personalización

### Cambiar colores de tema
Edita las variables CSS en `App.css`:

```css
:root {
  --primary: #6b5b55;
  --secondary: #d4a5a5;
  --accent: #e8d5c4;
  /* ... más variables */
}
```

### Agregar nuevas características
1. Modifica `App.tsx` para agregar lógica
2. Actualiza `App.css` para los estilos
3. Commit y push a tu rama

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 Licencia

MIT - Siéntete libre de usar este proyecto como quieras.

## 🤝 Contribuir

¿Quieres mejorar esto? ¡Genial!

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/Mejora`)
3. Commit tus cambios (`git commit -m 'Agregar mejora'`)
4. Push a la rama (`git push origin feature/Mejora`)
5. Abre un Pull Request

## ❤️ Construido con

- [React](https://react.dev) - Librería de UI
- [TypeScript](https://www.typescriptlang.org) - Tipado estático
- [Vite](https://vitejs.dev) - Build tool moderno
- ❤️ Amor y atención al detalle

---

¡Disfruta tomando notas! 📝✨
