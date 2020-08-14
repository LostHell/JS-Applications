import * as api from './data.js';

window.addEventListener('load', () => {
    const table = document.querySelector('table > tbody');
    document.querySelector('#loadBooks').addEventListener('click', displayBooks);

    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const isbnInput = document.querySelector('#isbn');
    document.querySelector('form > button').addEventListener('click', createBook);

    async function createBook(e) {
        e.preventDefault();

        const book = {
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value,
        };

        let valid = true;

        Object.entries(book).forEach(([k, v]) => {
            if (v.length === 0) {
                alert(`Book ${k} cannot be empty!`);
                valid = false;
            }
        });
        if (valid === false) {
            return;
        }
        try {
            const created = await api.createBook(book);

            table.appendChild(renderBook(created));
        } catch (err) {
            alert(err);
            console.error(err);
        }

        titleInput.value = '';
        authorInput.value = '';
        isbnInput.value = '';
    }

    async function editBook(book) {
        titleInput.value = book.title;
        authorInput.value = book.author;
        isbnInput.value = book.isbn;

        document.querySelector('form > button').addEventListener('click', async (e) => {
            e.preventDefault();

            const updatedBook = {
                objectId: book.objectId,
                title: titleInput.value,
                author: authorInput.value,
                isbn: isbnInput.value,
            }

            titleInput.value = '';
            authorInput.value = '';
            isbnInput.value = '';

            await api.updateBook(updatedBook);
            return displayBooks();
        });
    }

    async function displayBooks() {
        table.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
        const books = await api.getBooks();
        table.innerHTML = '';
        books.sort((a, b) => a.author.localeCompare(b.author))
            .forEach(b => table.appendChild(renderBook(b)));
    }

    function renderBook(book) {

        // Tables data
        const tr = document.createElement('tr');
        const title = document.createElement('td');
        const author = document.createElement('td');
        const isbn = document.createElement('td');
        const buttons = document.createElement('td');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';

        editBtn.addEventListener('click', () => editBook(book));

        deleteBtn.addEventListener('click', () => deleteBook(book.objectId));

        title.textContent = book.title;
        author.textContent = book.author;
        isbn.textContent = book.isbn;

        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(isbn);
        tr.appendChild(buttons);

        return tr;
    }

    async function deleteBook(id) {
        try {
            await api.deleteBook(id);
            return displayBooks();
        } catch (err) {
            alert(err);
            console.error(err)
        }
    }
});