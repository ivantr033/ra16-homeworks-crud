import { type SyntheticEvent } from 'react';

interface NotesFormProps {
    onAddNote: (content: string) => void;
}

export default function NotesForm({ onAddNote }: NotesFormProps) {
    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const content = formData.get('noteContent') as string;

        if (!content || !content.trim()) return;

        onAddNote(content.trim());
        e.currentTarget.reset();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px', maxWidth: '500px', position: 'relative' }}>
            <label htmlFor="noteContent" style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>New Note</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
                <textarea
                    id="noteContent"
                    name="noteContent"
                    required
                    rows={4}
                    style={{ width: '100%', padding: '12px 60px 12px 12px', border: '1px solid #333', borderRadius: '4px', resize: 'none', outline: 'none', fontSize: '1rem' }}
                />
                <button
                    type="submit"
                    style={{ position: 'absolute', right: '15px', bottom: '15px', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #333', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
                    title="Добавить"
                >
                    ➤
                </button>
            </div>
        </form>
    );
}
