/* globals Sammy */

import home from './controllers/home.js';
import movie, {create, myMovies, editMyMovie, deleteMyMovie} from './controllers/movie.js';
import movies from './controllers/cinema.js';
import login, {logme, logout} from './controllers/login.js';
import register, {newRegister} from './controllers/register.js';

window.addEventListener('load', () => {

    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        if (localStorage.getItem('userToken')) {
            this.userData = {
                loggedIn: true,
                username: localStorage.getItem('username')
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

        // Movie page
        this.get('#/create', movie);
        this.post('#/create', (ctx) => {
            create.call(ctx);
        });
        this.get('#/mymovies', myMovies);
        this.get('#/edit/:id', editMyMovie);
        this.post('#/edit/:id', (ctx) => {
            editMyMovie.call(ctx);
        });
        this.get('#/delete/:id', deleteMyMovie);

        // Login page
        this.get('#/login', login);
        this.post('#/login', (ctx) => {
            logme.call(ctx);
        });

        // Register page
        this.get('#/register', register);
        this.post('#/register', (ctx) => {
            newRegister.call(ctx)
        });

        // Logout page
        this.get('#/logout', logout)

        // Cinema page
        this.get('#/cinema', movies);
    });

    app.run();
});