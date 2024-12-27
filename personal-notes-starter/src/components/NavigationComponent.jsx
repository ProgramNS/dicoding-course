import React from "react";

function NavigationComponent({searchTitle, onSearchChange}){
    return (
        <>
            <nav>
                <h1>Notes</h1>
                <input type="search" placeholder="Search..." value={searchTitle} onChange={(event)=> onSearchChange(event.target.value)}/>
            </nav>
        </>
    );
};

export default NavigationComponent;