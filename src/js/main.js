const bookItem = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'save-book';
const STORAGE_KEY = 'BOOKS-APP';


const generateId = () => +new Date();
const generateObjectBooks = (id , title, author, year, isComplete ) => ({id, title, author, year, isComplete});
const searchBooks = (bookId) => bookItem.find((book) => book.id === bookId);
const searchIndexBooks = (bookId) => bookItem.findIndex((book) => book.id === bookId || null);


// funsi cek browser support local storage atau tidak
const checkBrowserStorage = () => {
    if (typeof (Storage) === undefined){
        alert("Browser Anda Tidak Mendukung Local Storage");
        return false;
    }
    return true;
};

// fungsi untuk menyimpan data buku ke local storage
const saveDataBooks = () => {
    if(checkBrowserStorage()){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookItem));
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
};

// funsi untuk meload data dari local storage
const loadDataFromStorage = () => {
    const serializeData = localStorage.getItem(STORAGE_KEY);
    if (serializeData){
        const data = JSON.parse(serializeData);
        bookItem.push(...data);    
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
};

// funsi untuk menampilkan list buku
const renderBooks = () => {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');

    // clear view data list
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    for (const book of bookItem) {
        const bookElement = makeBooks(book);
        if(book.isComplete){
            completeBookList.append(bookElement);
        } else {
            incompleteBookList.append(bookElement);
        }
    }
};

// fungsi membuat isi element buku
const makeBooks = (book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book_item');
    bookElement.setAttribute('data-bookid',book.id);
    bookElement.setAttribute('data-testid','bookItem');

    const bookTitle = document.createElement('h3');
    bookTitle.innerText = book.title;
    bookTitle.setAttribute('data-testid','bookItemTitle');

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = `Penulis : ${book.author}`;
    bookAuthor.setAttribute('data-testid','bookItemAuthor');
    
    const bookYear = document.createElement('p');
    bookYear.innerText = `Year: ${book.year}`;
    bookYear.setAttribute('data-testid','bookItemYear');

    const buttonContainer = document.createElement('div');

    const checkStatusBookButton = document.createElement('button');
    checkStatusBookButton.innerText = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
    checkStatusBookButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    checkStatusBookButton.addEventListener('click', () => {
        checkStatus(book.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Hapus Buku';
    deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteButton.addEventListener('click',() => {
        removeBook(book.id);
    });

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit Buku';
    editButton.setAttribute('data-testid','bookItemEditButton');
    editButton.addEventListener(('click'), () => {
        editBook(book.id);
    });

    buttonContainer.append(checkStatusBookButton,deleteButton,editButton);
    bookElement.append(bookTitle,bookAuthor,bookYear,buttonContainer);

    return bookElement;
};

// fungsi untuk mengubah status selesai baca atau belum
const checkStatus = (bookId) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Ubah Status",
        text: "Apakah anda ingin mengubah status menjadi selesai?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "No",
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
            const bookTarget = searchBooks(bookId);
            if(bookTarget == null) return;
            bookTarget.isComplete = !bookTarget.isComplete;
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveDataBooks();
            swalWithBootstrapButtons.fire({
            title: "Terubah",
            text: "Data berhasil diubah",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
            title: "Tidak Terubah",
            text: "Data tidak berhasil diubah",
            icon: "error"
          });
        }
      });
};

// fungsi untuk menghapus data buku
const removeBook = (bookId) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Hapus Data",
        text: "Apakah anda ingin menghapus data?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "No",
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
            const bookTarget = searchIndexBooks(bookId);
            if(bookTarget === -1) return;
            bookItem.splice(bookTarget,1);
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveDataBooks();
            swalWithBootstrapButtons.fire({
            title: "Terhapus",
            text: "Data berhasil dihapus",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
            title: "Tidak Terhapus",
            text: "Data tidak berhasil dihapus",
            icon: "error"
          });
        }
      });
};

// fungsi untuk mengedit data buku dengan menggunakan prompt js sebagai input data barunya
const editBook = (bookId) => {
    const bookTarget = searchBooks(bookId);
    if(bookTarget == null) return;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Edit Data",
        text: "Apakah anda ingin mengubah data?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "No",
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
            const newTitle = prompt('Masukan judul baru: ', bookTarget.title);
            const newAuthor = prompt('Masukan penulis baru: ', bookTarget.author);
            const newYear = prompt('Masukan tahun baru: ', bookTarget.year);

            if(newTitle) bookTarget.title = newTitle;
            if(newAuthor) bookTarget.author = newAuthor;
            if(newYear) bookTarget.year = newYear;

            document.dispatchEvent(new Event(RENDER_EVENT));
            saveDataBooks();
            swalWithBootstrapButtons.fire({
            title: "Terbaharui",
            text: "Data berhasil diubah",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
            title: "Tidak Terubah",
            text: "Data tidak berhasil diubah",
            icon: "error"
          });
        }
      });
};

// fungsi untuk merender hasil pencarian
const renderFilterBooks = (filterBooks) => {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');

    // clear view data list
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    for (const book of filterBooks) {
        const bookElement = makeBooks(book);
        if(book.isComplete){
            completeBookList.append(bookElement);
        } else {
            incompleteBookList.append(bookElement);
        }
    }
};

// Menyimpan data langsung melalui id form
document.getElementById('bookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = document.getElementById('bookFormYear').value;
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    const bookObject = generateObjectBooks(generateId(), title, author, year, isComplete);

    if(bookObject !== null){
        bookItem.push(bookObject);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Berhasil menambahkan buku",
            showConfirmButton: true,
            timer: 1500
          });
          document.dispatchEvent(new Event(RENDER_EVENT));
          saveDataBooks();
    } else {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Gagal menambahkan buku!",
            showConfirmButton: true,
            timer: 1500
          });
    }
})

// Mencari data buku berdasarkan dari judul buku melalui id searchBook dan di filter dari bookItem
document.getElementById('searchBook').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    const filterBooks = bookItem.filter(book => book.title.toLowerCase().includes(searchTitle));
    renderFilterBooks(filterBooks);
})

// Merender data buku untuk tampilan UI
document.addEventListener(RENDER_EVENT, () => {
    renderBooks();
});

// Meload data dengan menggunakan listener dari DOM dengan penyimpanan local storage
document.addEventListener('DOMContentLoaded', () => {
    if(checkBrowserStorage()){
        loadDataFromStorage();
    }
});







