import React from "react";
import { getData } from "./data";
import ContactList from "./ContactList";

import './styles/style.css';

function ContactApp(){
    const contacts = getData();
    console.log(contacts);
    return (
        <div className="contact-app">
            <h1>Daftar Kontak</h1>
            <ContactList contacts={contacts} />
        </div>
    );
}


export default ContactApp;