# 🤖 Integración de Claude con Git

Esta guía te muestra cómo usar Claude para ayudarte en el desarrollo de este proyecto.

## 1️⃣ Analizando el código con Claude

Puedes compartir archivos del proyecto directamente con Claude:

```
"Claude, analiza el archivo App.tsx y sugiere mejoras"
```

Claude puede:
- ✅ Revisar código y encontrar bugs
- ✅ Sugerir mejoras de rendimiento
- ✅ Añadir nuevas características
- ✅ Refactorizar código
- ✅ Escribir tests

## 2️⃣ Usando Claude Code (Terminal)

Si instalas Claude Code, puedes automatizar tareas de Git:

```bash
# Claude Code puede hacer commits automáticos
git add .
git commit -m "Feature: Agregar soporte para categorías"
git push origin feature/categorias

# O incluso manejar branches
git checkout -b bugfix/title-validation
# (Claude hace los cambios)
git commit -m "Fix: Validar títulos vacíos"
git push origin bugfix/title-validation
```

## 3️⃣ Flujos de trabajo comunes

### Agregar una nueva característica

```
1. Cuéntale a Claude qué quieres (ej: "Quiero agregar categorías")
2. Claude modifica App.tsx, App.css, y actualizaREADME.md
3. Prueba en local: npm run dev
4. Si está bien, haz:
   git add .
   git commit -m "Feature: Agregar categorías"
   git push
```

### Arreglar un bug

```
1. Copia el error en el chat de Claude
2. Claude identifica el problema en App.tsx
3. Aplica la solución
4. Verifica que funciona
5. Commit:
   git add .
   git commit -m "Fix: Arreglar problema de [descripción]"
   git push
```

### Mejorar el código

```
1. Pide a Claude revisar la calidad
2. Claude sugiere refactorizaciones
3. Aplica los cambios
4. Commit:
   git add .
   git commit -m "Refactor: Mejorar [sección]"
   git push
```

## 4️⃣ Buenas prácticas con Git

### Mensajes de commit claros

```bash
# ✅ BUENO
git commit -m "Feature: Agregar búsqueda de notas"
git commit -m "Fix: Arreglar error al guardar"
git commit -m "Docs: Actualizar README"
git commit -m "Refactor: Simplificar lógica de almacenamiento"

# ❌ EVITAR
git commit -m "cambios"
git commit -m "fix"
git commit -m "actualizado"
```

### Ramas organizadas

```bash
# Para características nuevas
git checkout -b feature/nombre-caracteristica

# Para arreglos
git checkout -b fix/nombre-del-bug

# Para documentación
git checkout -b docs/actualizar-readme

# Para mejoras
git checkout -b refactor/nombre-del-refactor
```

## 5️⃣ Solicitudes útiles a Claude

### Revisar código
```
"Revisa App.tsx y App.css buscando:
- Bugs potenciales
- Mejoras de rendimiento
- Oportunidades de refactoring
- Problemas de accesibilidad"
```

### Agregar tests
```
"Escribe tests unitarios para App.tsx usando Vitest"
```

### Documentación
```
"Escribe documentación detallada para la función handleSave"
```

### Optimización
```
"Optimiza el rendimiento de la búsqueda en App.tsx"
```

### Nuevas características
```
"Agrega la capacidad de exportar notas como PDF"
```

## 6️⃣ Workflow completo ejemplo

```bash
# 1. Crear rama para nueva característica
git checkout -b feature/notas-favoritas

# 2. Pedir a Claude que agregue la característica
# (en el chat de Claude)

# 3. Prueba local
npm run dev

# 4. Agregar cambios y hacer commit
git add .
git commit -m "Feature: Agregar sistema de notas favoritas"

# 5. Hacer push
git push origin feature/notas-favoritas

# 6. Crear Pull Request en GitHub (opcional)
# - Ve a github.com/tu-usuario/gestor-notas
# - Haz clic en "Compare & pull request"
# - Agrega descripción
# - Merge a main

# 7. Actualizar rama local
git checkout main
git pull origin main
```

## 🎯 Beneficios de usar Claude con Git

| Tarea | Sin Claude | Con Claude |
|-------|-----------|-----------|
| Escribir código | 30 min | 5 min |
| Revisar código | 15 min | 2 min |
| Escribir tests | 45 min | 10 min |
| Refactorizar | 60 min | 20 min |
| Documentar | 30 min | 5 min |

## 💡 Pro Tips

1. **Usa Claude para brainstorming** - Pregunta sobre arquitectura antes de codificar
2. **Commit frecuentes** - Pequeños commits son más fáciles de revisar
3. **Prueba antes de push** - Siempre corre `npm run dev` antes de hacer push
4. **Mensajes descriptivos** - Los futuros tú te lo agradecerá
5. **Pide ayuda con git** - Claude puede ayudarte con comandos complejos

---

¡Ahora estás listo para trabajar con Claude y Git! 🚀
