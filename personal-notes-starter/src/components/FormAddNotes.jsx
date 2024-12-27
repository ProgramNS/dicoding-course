import React from "react";
import { onChangeBodyHandler, onChangeTitleHandler, onSubmitNoteHandler } from "../handler/FormAddNotesHandler";


class FormAddNotes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: ''
        }

        this.onChangeTitleHandler = onChangeTitleHandler(this.setState.bind(this));
        this.onChangeBodyHandler = onChangeBodyHandler(this.setState.bind(this));
        this.onSubmitNoteHandler = this.onSubmitNoteHandler.bind(this);
    };

    onSubmitNoteHandler(event){
        onSubmitNoteHandler(event,this.state,this.props.addNotes);
        this.setState({title: '',body: ''});
    };

    render() {
        const maxTitleLenght = 50;
        const titleLenght = String(this.state.title).length;
        return (

            <>
                <form onSubmit={this.onSubmitNoteHandler}>
                    <h2>Tambah Catatan</h2>
                    <p className="max-character">Sisa Karakter:{maxTitleLenght-titleLenght}</p>
                    <input
                        type="text"
                        placeholder="Judul Catatan..."
                        value={this.state.title}
                        onChange={this.onChangeTitleHandler} />
                    <textarea
                        name="isi"
                        id="isi-catatan"
                        placeholder="Tulis isi catatanmu..."
                        value={this.state.body}
                        onChange={this.onChangeBodyHandler}></textarea>
                    <button type="submit">Buat Catatan</button>
                </form>
            </>
        );
    };
};

export default FormAddNotes;