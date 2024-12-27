export const onSearchHandler = (searchTitle, notes, setState) => {
    if (!searchTitle) {
        setState({
            searchTitle: '',
            filteredNotes: notes,
            noResults: false
        });
    } else {
        const filteredNotes = notes.filter((note) =>
            note.title.toLowerCase().includes(searchTitle.toLowerCase())
        );

        setState({
            searchTitle: searchTitle.toLowerCase(),
            filteredNotes: filteredNotes,
            noResults: filteredNotes.length === 0
        });
    }
};
