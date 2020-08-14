import home from "../scripts/controllers/home.js";
import login, {newLogin, logMeOut} from "../scripts/controllers/login.js";
import register, {newRegister} from "../scripts/controllers/register.js";
import book, {newBook, currentBook, edit, editCurrent, deleteBook} from "../scripts/controllers/book.js";

window.addEventListener('load', () => {
    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

        if (localStorage.getItem('userToken')) {
            this.userData = {
                javaScript: [],
                python: [],
                csharp: [],
                java: [],
                loggedIn: true,
                email: localStorage.getItem('email')
            }
        } else {
            this.userData = {
                loggedIn: false
            }
        }

        // Home page
        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        // Login page
        this.post('#/login', (ctx) => {
            newLogin.call(ctx);
        });

        // Logout page
        this.get('#/logout', logMeOut);

        // Register page
        this.get('#/register', register);
        this.post('#/newRegister', (ctx) => {
            newRegister.call(ctx);
        });

        // Create page
        this.get('#/create', book);
        this.post('#/newBook', (ctx) => {
            newBook.call(ctx);
        });

        // Edit page
        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', (ctx) => {
            editCurrent.call(ctx);
        });

        // Detail page
        this.get('#/details/:id', currentBook);

        // Delete
        this.get('#/delete/:id', deleteBook);

    });
    app.run();
});