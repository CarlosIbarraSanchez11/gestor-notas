import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  category: string;
  isFavorite: boolean;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  
  const colors = ['#fef3f0', '#f0f8f6', '#f5f3ff', '#fffbf0', '#f0f4ff'];
  const categories = ['Personal', 'Trabajo', 'Ideas', 'Tareas', 'Otros'];

  // Notas de ejemplo
  const exampleNotes: Note[] = [
    {
      id: '001',
      title: 'Reunión con el equipo de desarrollo',
      content: 'Discutir el roadmap para Q2. Temas: nuevas features, mejoras de rendimiento, y refactoring de código. Próxima reunión: 15 de junio.',
      createdAt: new Date('2026-05-20'),
      updatedAt: new Date('2026-05-25'),
      color: '#f0f8f6',
      category: 'Trabajo',
      isFavorite: true,
    },
    {
      id: '002',
      title: 'Bug crítico - Modo oscuro',
      content: 'El toggle de modo oscuro no persiste correctamente en algunos navegadores. Prioridad: ALTA. Asignado a: Carlos',
      createdAt: new Date('2026-05-22'),
      updatedAt: new Date('2026-05-26'),
      color: '#fffbf0',
      category: 'Tareas',
      isFavorite: true,
    },
    {
      id: '003',
      title: 'Ideas para nuevas features',
      content: '- Exportar notas como PDF\n- Sincronización en la nube\n- Colaboración en tiempo real\n- Recordatorios automáticos\n- Etiquetas para mejor organización',
      createdAt: new Date('2026-05-18'),
      updatedAt: new Date('2026-05-24'),
      color: '#fef3f0',
      category: 'Ideas',
      isFavorite: false,
    },
    {
      id: '004',
      title: 'Aprendizaje - React Hooks',
      content: 'Hoy aprendí sobre useMemo y useCallback para optimizar rendimiento. Casos de uso: listas grandes, funciones en props. Revisar docs oficiales.',
      createdAt: new Date('2026-05-19'),
      updatedAt: new Date('2026-05-19'),
      color: '#f5f3ff',
      category: 'Personal',
      isFavorite: false,
    },
    {
      id: '005',
      title: 'Tareas pendientes - Mayo',
      content: '✅ Crear repositorio en GitHub\n✅ Agregar modo oscuro\n⏳ Desplegar en Netlify\n⏳ Escribir documentación\n⏳ Hacer código review',
      createdAt: new Date('2026-05-21'),
      updatedAt: new Date('2026-05-26'),
      color: '#f0f4ff',
      category: 'Tareas',
      isFavorite: false,
    },
    {
      id: '006',
      title: 'Configuración de ESLint y Prettier',
      content: 'Configurar ESLint para TypeScript, agregar Prettier para formato automático. Comandos: npm run lint, npm run format',
      createdAt: new Date('2026-05-17'),
      updatedAt: new Date('2026-05-23'),
      color: '#fef3f0',
      category: 'Trabajo',
      isFavorite: false,
    },
    {
      id: '007',
      title: '💡 Idea: Modo colaborativo',
      content: 'Permitir que múltiples usuarios editen notas en tiempo real. Usar WebSockets o Firebase. ¿Vale la pena? Depende de la comunidad.',
      createdAt: new Date('2026-05-23'),
      updatedAt: new Date('2026-05-23'),
      color: '#fffbf0',
      category: 'Ideas',
      isFavorite: true,
    },
    {
      id: '008',
      title: 'Plan de despliegue a producción',
      content: 'Pasos:\n1. Build: npm run build\n2. Test: npm run test\n3. Deploy en Vercel\n4. Configurar dominio personalizado\n5. Monitoreo con Sentry',
      createdAt: new Date('2026-05-24'),
      updatedAt: new Date('2026-05-26'),
      color: '#f0f8f6',
      category: 'Trabajo',
      isFavorite: false,
    },
    {
      id: '009',
      title: 'Notas personales - Reflexión',
      content: 'Hoy fue un día productivo. Logré terminar la integración de categorías y favoritos. Próxima meta: implementar exportación a PDF. ¡Vamos!',
      createdAt: new Date('2026-05-25'),
      updatedAt: new Date('2026-05-25'),
      color: '#f5f3ff',
      category: 'Personal',
      isFavorite: false,
    },
    {
      id: '010',
      title: 'Revisión de código - App.tsx',
      content: 'Puntos a mejorar:\n- Validación de inputs más robusta\n- Usar crypto.randomUUID() para IDs\n- Agregar useMemo para filtros\n- Manejo de errores en localStorage',
      createdAt: new Date('2026-05-26'),
      updatedAt: new Date('2026-05-26'),
      color: '#f0f4ff',
      category: 'Tareas',
      isFavorite: true,
    },
  ];

  // Cargar datos del localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedNotes) {
      try {
        const parsed = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
        setNotes(parsed);
      } catch (error) {
        console.error('Error al cargar notas:', error);
        setNotes(exampleNotes);
      }
    } else {
      // Si no hay notas guardadas, cargar ejemplos
      setNotes(exampleNotes);
    }
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Guardar notas en localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Guardar modo oscuro en localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // Crear o actualizar nota
  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      alert('Por favor escribe algo en la nota');
      return;
    }

    const now = new Date();
    const category = newCategory || selectedNote?.category || 'Otros';
    
    if (selectedNote) {
      setNotes(
        notes.map((note) =>
          note.id === selectedNote.id
            ? { 
                ...note, 
                title: title || 'Sin título', 
                content, 
                updatedAt: now,
                category,
                isFavorite: selectedNote.isFavorite
              }
            : note
        )
      );
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: title || 'Sin título',
        content,
        createdAt: now,
        updatedAt: now,
        color: colors[Math.floor(Math.random() * colors.length)],
        category: category,
        isFavorite: false,
      };
      setNotes([newNote, ...notes]);
    }
    handleNewNote();
  };

  // Crear nueva nota
  const handleNewNote = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
    setNewCategory('');
  };

  // Eliminar nota
  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNote?.id === id) {
      handleNewNote();
    }
  };

  // Toggle favorito
  const toggleFavorite = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
    if (selectedNote?.id === id) {
      setSelectedNote({ ...selectedNote, isFavorite: !selectedNote.isFavorite });
    }
  };

  // Filtrar notas con useMemo
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        selectedCategory === 'todos' || note.category === selectedCategory;
      
      const matchesFavorite = !showOnlyFavorites || note.isFavorite;
      
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [notes, searchTerm, selectedCategory, showOnlyFavorites]);

  return (
    <div className="app" data-theme={darkMode ? 'dark' : 'light'}>
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>📝 Mis Notas</h1>
          <button 
            className="btn-theme" 
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar notas..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="category-filter">
          <label className="filter-label">📂 Categorías:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="todos">Todas</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`btn-favorites ${showOnlyFavorites ? 'active' : ''}`}
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
        >
          ⭐ {showOnlyFavorites ? 'Mostrar todas' : 'Solo favoritas'}
        </button>

        <button className="btn-new" onClick={handleNewNote}>
          + Nueva Nota
        </button>

        <div className="notes-list">
          {filteredNotes.length === 0 ? (
            <p className="empty-state">No hay notas</p>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                style={{ backgroundColor: note.color }}
              >
                <div className="note-item-header">
                  <div
                    className="note-item-title"
                    onClick={() => {
                      setSelectedNote(note);
                      setTitle(note.title);
                      setContent(note.content);
                      setNewCategory(note.category);
                    }}
                  >
                    {note.title}
                  </div>
                  <button
                    className={`btn-favorite-star ${note.isFavorite ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(note.id);
                    }}
                  >
                    {note.isFavorite ? '⭐' : '☆'}
                  </button>
                </div>
                <div className="note-item-category">{note.category}</div>
                <div className="note-item-preview">{note.content.substring(0, 50)}</div>
                <div className="note-item-date">
                  {note.updatedAt.toLocaleDateString('es-ES')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="editor">
        {selectedNote || title || content ? (
          <>
            <input
              type="text"
              placeholder="Título de la nota..."
              className="editor-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="editor-category"
            >
              <option value="">Selecciona categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Escribe tu nota aquí..."
              className="editor-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            <div className="editor-actions">
              <button className="btn-save" onClick={handleSave}>
                💾 Guardar
              </button>
              {selectedNote && (
                <>
                  <button
                    className={`btn-favorite ${selectedNote.isFavorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(selectedNote.id)}
                  >
                    {selectedNote.isFavorite ? '⭐ Favorita' : '☆ Marcar favorita'}
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(selectedNote.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="empty-editor">
            <div className="empty-icon">📝</div>
            <p>Crea una nueva nota para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;