import React from "react";
import CardView from "./CardView";
import { showFormattedDate } from "../utils";
function NoteList({ notes, onDelete, onArchive, archived }) {
    return (
        <>
            <section>
                {
                    notes.map((note) => (
                        <CardView
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            body={note.body}
                            createdAt={showFormattedDate(note.createdAt)}
                            archived={note.archived}
                            onDelete={onDelete}
                            onArchive={onArchive} />
                    ))
                }

            </section>
        </>
    );
};

export default NoteList;