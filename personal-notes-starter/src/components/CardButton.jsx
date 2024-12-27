import React from "react";

function CardButton({id,onDelete,onArchive,archived}){
    return(
        <div className="card-actions">
            <button className="delete" onClick={()=>{onDelete(id)}}>Hapus</button>
            <button className="archive" onClick={()=>{onArchive(id)}}>{archived ? 'Pindahkan' : 'Arsipkan'}</button>
        </div>
    );
};

export default CardButton;