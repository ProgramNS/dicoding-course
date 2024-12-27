import React from "react";
import NavigationComponent from "./NavigationComponent";
import FooterComponent from "./FooterComponent";
import FormAddNotes from "./FormAddNotes";
import { getInitialData } from "../utils";
import NoteList from "./NoteList";
import { onDeleteNotesHandler, onArchiveNotesHandler } from "../handler/ButtonActiveNotesHandler";
import { onAddNoteHandler } from "../handler/FormAddNotesHandler";
import { onSearchHandler } from "../handler/SearchHandler";
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getInitialData(),
            filteredNotes: [],
            searchTitle: '',
            noResult: false
        };

        this.onDeleteNotesHandler = this.onDeleteNotesHandler.bind(this);
        this.onArchiveNotesHandler = this.onArchiveNotesHandler.bind(this);
        this.onAddNoteHandler = onAddNoteHandler(this.setState.bind(this));
    }

    onDeleteNotesHandler(id) {
        onDeleteNotesHandler(id, this.state.notes, (updatesNotes) => {
            this.setState({ notes: updatesNotes });
        })
    }

    onArchiveNotesHandler = (id) => {
        onArchiveNotesHandler(id, this.state.notes, (updatedNotes) => {
            this.setState({ notes: updatedNotes });
        });
    };


    render() {
        const { filteredNotes, notes, searchTitle, noResults } = this.state;
        const displayedNotes = searchTitle ? filteredNotes : notes;
        const activeNotes = displayedNotes.filter((note) => !note.archived);
        const archivedNotes = displayedNotes.filter(note => note.archived);
        return (
            <>
                <NavigationComponent
                    searchTitle={searchTitle}
                    onSearchChange={(value) => onSearchHandler(value, notes, this.setState.bind(this))} />
                <div className="container">
                    <FormAddNotes addNotes={this.onAddNoteHandler} />
                    {
                        noResults ? (<p className="empty-data">Catatan belum dibuat</p>) : (
                            <>
                                <h2>Catatan Aktif</h2>
                                {
                                    activeNotes.length > 0 ? (
                                        <NoteList notes={activeNotes}
                                            onDelete={this.onDeleteNotesHandler}
                                            onArchive={this.onArchiveNotesHandler} />
                                    ) : (<p className="empty-data">Tidak ada catatan</p>)
                                }
                                <h2>Arsip</h2>
                                {
                                    archivedNotes.length > 0 ? (
                                        <NoteList
                                            notes={archivedNotes}
                                            onDelete={this.onDeleteNotesHandler}
                                            onArchive={this.onArchiveNotesHandler} />
                                    ) : (
                                        <p className="empty-data">Tidak ada yang di arsipkan</p>
                                    )
                                }
                            </>
                        )
                    }
                </div>
                <FooterComponent />
            </>
        );
    }
};

export default App;