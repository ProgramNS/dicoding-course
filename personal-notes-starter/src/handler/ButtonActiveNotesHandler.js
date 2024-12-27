export const onDeleteNotesHandler = (id, notes, setNotes) => {
    const UpdateNotes = notes.filter(note => note.id !== id);
    setNotes(UpdateNotes);
};

export const onArchiveNotesHandler = (id, notes, setNotes) => {
    const updatedNotes = notes.map(note => 
        note.id === id ? { ...note, archived: !note.archived } : note
    );
    setNotes(updatedNotes);
};
