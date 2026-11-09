import { useState, useEffect } from 'react';
import { type Note } from './types/types';
import NoteCard from './components/NoteCard';
import NotesForm from './components/NotesForm';

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:7070/notes';

  // GET
  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Ошибка при загрузке заметок с сервера');
      const data = await response.json();
      setNotes(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Не удалось подключиться к серверу');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // POST
  const handleAddNote = async (content: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 0, content })
      });
      if (!response.ok) throw new Error('Ошибка при добавлении заметки');
      fetchNotes();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  // DELETE
  const handleDeleteNote = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Ошибка при удалении заметки');
      fetchNotes();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  // Mounting
  useEffect(() => {
    let isMounted = true;

    const initFetch = async () => {
      if (isMounted) {
        await fetchNotes();
      }
    };

    void initFetch();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>

      {/* Шапка: Заголовок + Кнопка Обновить */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '500' }}>Notes</h2>
        <button
          onClick={fetchNotes}
          disabled={isLoading}
          style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #28a745', backgroundColor: '#fff', color: '#28a745', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', transition: 'transform 0.2s ease' }}
          title="Обновить список"
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(180deg)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
        >
          ↻
        </button>
      </div>

      {/* Индикаторы состояний HTTP */}
      {error && <div style={{ color: '#dc3545', padding: '10px', border: '1px solid #dc3545', borderRadius: '4px', backgroundColor: '#f8d7da', marginBottom: '20px' }}>⚠️ {error}</div>}
      {isLoading && <div style={{ color: '#0056b3', fontWeight: 'bold', marginBottom: '20px' }}>Загрузка заметок...</div>}

      {/* Сетка карточек */}
      {!isLoading && notes.length === 0 && !error && <p style={{ color: '#666' }}>Список заметок пуст. Добавьте первую!</p>}

      <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={handleDeleteNote}
          />
        ))}
      </div>

      {/* Форма добавления */}
      <NotesForm onAddNote={handleAddNote} />
    </div>
  );
}
