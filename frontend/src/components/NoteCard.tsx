import { Note } from '../types/types';

interface NoteCardProps {
    note: Note;
    onDelete: (id: number) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
    return (
        <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '4px', position: 'relative', backgroundColor: '#fff', minWidth: '220px', maxWidth: '300px', flex: '1 1 220px', boxShadow: '2px 2px 5px rgba(0,0,0,0.05)' }}>
            <button
                onClick={() => onDelete(note.id)}
                style={{ position: 'absolute', top: '-12px', right: '-12px', width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #dc3545', backgroundColor: '#fff', color: '#dc3545', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}
                title="Удалить заметку"
            >
                ✕
            </button>
            <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#212529', lineHeight: '1.5', fontSize: '0.95rem', overflowWrap: 'anywhere' }}>
                {note.content}
            </p>
        </div>
    );
}
