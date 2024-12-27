import React from "react";
import CardItemBody from "./CardItemBody";
import CardButton from "./CardButton";

function CardView({ id, title, body, createdAt, archived ,onDelete, onArchive }) {
    return (
        <>
            <div className="card">
                <CardItemBody title={title} createdAt={createdAt} body={body} />
                <CardButton id={id} onDelete={onDelete} onArchive={onArchive} archived={archived}/>
            </div>
        </>
    )
}

export default CardView;