import React, { useState, useEffect } from 'react';
import './App.css';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [colors] = useState(['#fef3f0', '#f0f8f6', '#f5f3ff', '#fffbf0', '#f0f4ff']);

  // Cargar notas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('notes');
    if (saved) {
      const parsed = JSON.parse(saved).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
      setNotes(parsed);
    }
  }, []);

  // Guardar notas en localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Crear o actualizar nota
  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;

    const now = new Date();
    if (selectedNote) {
      setNotes(
        notes.map((note) =>
          note.id === selectedNote.id
            ? { ...note, title: title || 'Sin título', content, updatedAt: now }
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
  };

  // Eliminar nota
  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNote?.id === id) {
      handleNewNote();
    }
  };

  // Filtrar notas
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Mis Notas</h1>
          <button className="btn-new" onClick={handleNewNote}>
            + Nueva
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar notas..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="notes-list">
          {filteredNotes.length === 0 ? (
            <p className="empty-state">No hay notas aún</p>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                style={{ backgroundColor: note.color }}
                onClick={() => {
                  setSelectedNote(note);
                  setTitle(note.title);
                  setContent(note.content);
                }}
              >
                <div className="note-item-title">{note.title}</div>
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
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(selectedNote.id)}
                >
                  🗑️ Eliminar
                </button>
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
