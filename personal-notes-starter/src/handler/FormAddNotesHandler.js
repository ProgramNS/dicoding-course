export const onChangeTitleHandler = (setState) => (event) => {
    const title = event.target.value;
    if(title.length <= 50) {
        setState({
            title: event.target.value
        });
    }
};

export const onChangeBodyHandler = (setState) => (event) => {
    setState({
        body: event.target.value
    });
};

export const onSubmitNoteHandler = (event,state,addNotes) => {
    event.preventDefault();
    if(state.title && state.body){
        addNotes(state.title, state.body);
    }else{
        alert('Judul dan isi catatan tidak boleh kosong!!')
    }
};

export const onAddNoteHandler = (setState) => (title,body) =>{
    setState((prevState)=>{
        const notes = prevState.notes || [];
        return {
            notes : [...notes,{
                id: +new Date(),
                title,
                body,
                createdAt: new Date().toISOString(),
                archived : false
            }]
        };
    });
};



