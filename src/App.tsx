import React, { useState, useEffect } from 'react';
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

  // Cargar datos del localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
      setNotes(parsed);
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
    if (!title.trim() && !content.trim()) return;

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
        id: Math.random().toString(36).substr(2, 9),
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

  // Filtrar notas
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'todos' || note.category === selectedCategory;
    
    const matchesFavorite = !showOnlyFavorites || note.isFavorite;
    
    return matchesSearch && matchesCategory && matchesFavorite;
  });

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