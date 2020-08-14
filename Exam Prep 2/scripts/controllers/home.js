import {getBooks} from "../data.js";

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    if (localStorage.getItem('userToken')) {
        const books = await getBooks();
        this.app.userData.javaScript = [];
        this.app.userData.python = [];
        this.app.userData.java = [];
        this.app.userData.csharp = [];

        for (const book of books) {
            if (book.category.toLowerCase() === 'java script') {
                this.app.userData.javaScript.push(book);
            } else if (book.category.toLowerCase() === 'python') {
                this.app.userData.python.push(book);
            } else if (book.category.toLowerCase() === 'java') {
                this.app.userData.java.push(book);
            } else if (book.category.toLowerCase() === 'csharp') {
                this.app.userData.csharp.push(book);
            }
        }
    }

    this.partial('./templates/home.hbs', this.app.userData);
}