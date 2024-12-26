import React from "react";

class ContactInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            tag: ''
        }

        this.onNameChangeHandler = this.onNameChangeHandler.bind(this);
        this.onTagChangeHandler = this.onTagChangeHandler.bind(this);
        this.onSubmitButtonHandler = this.onSubmitButtonHandler.bind(this);
    }

    onNameChangeHandler(event) {
        this.setState(() => {
            return {
                name : event.target.value
            }
        })
    }

    onTagChangeHandler(event){
        this.setState(() => {
            return {
                tag : event.target.value
            }
        })
    }

    onSubmitButtonHandler(event){
        event.preventDefault();
        this.props.addContact(this.state);
    }

    render() {
        return (
            <form className="contact-input" onSubmit={this.onSubmitButtonHandler}>
                <input type="text" placeholder="Nama" value={this.state.name} onChange={this.onNameChangeHandler}/>
                <input type="text" placeholder="Tag" value={this.state.tag} onChange={this.onTagChangeHandler}/>
                <button type="submit">Tambah Kontak</button>
            </form>
        )
    }
}

export default ContactInput;