import {createBook, getBookById, editBook, deleteBook as deleteCurrentBook} from "../data.js";

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/book/book.hbs', this.app.userData);
}

export async function newBook() {
    const newBook = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content,
        creator: this.app.userData.email
    }

    await createBook(newBook);

    return this.redirect('/');
}

export async function currentBook(book) {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const myBook = await getBookById(book.params.id);

    const data = Object.assign({myBook}, this.app.userData)

    this.partial('./templates/book/details.hbs', data);
}

export async function edit(book) {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const myBook = await getBookById(book.params.id);

    const data = Object.assign({myBook}, this.app.userData)

    this.partial('./templates/book/edit.hbs', data);
}

export async function editCurrent() {
    const updatedBook = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content,
    }
    await editBook(this.params.id, updatedBook);

    return this.redirect('/');
}

export async function deleteBook() {
    await deleteCurrentBook(this.params.id);

    return this.redirect('/');
}