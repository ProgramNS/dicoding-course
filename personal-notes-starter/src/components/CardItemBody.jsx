import React from "react";

function CardItemBody({ title, body, createdAt }) {
    return (
        <div className="card-body">
            <h3>{title}</h3>
            <p className="item-date">{createdAt}</p>
            <p>{body}</p>
        </div>
    );
};

export default CardItemBody