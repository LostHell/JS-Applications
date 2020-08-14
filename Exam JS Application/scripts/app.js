import home from './controllers/home.js';
import login, {logme, logout} from './controllers/login.js';
import register, {newRegister} from './controllers/register.js';
import movie, {
    getMovie,
    create,
    movieToEdit,
    editMyMovie,
    deleteMyMovie,
    like,
    findMovieByName
} from './controllers/movie.js';

window.addEventListener('load', () => {

    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        if (localStorage.getItem('userToken')) {
            this.userData = {
                moviesId: [],
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
        this.get('#/search', findMovieByName);

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
        this.get('#/logout', logout);

        // Create Movie
        this.get('#/create', movie);
        this.post('#/create', (ctx) => {
            create.call(ctx);
        });

        // Edit movie
        this.get('#/edit/:id', movieToEdit);
        this.post('#/edit/:id', (ctx) => {
            editMyMovie.call(ctx);
        });

        // Details page
        this.get('#/details/:id', getMovie);

        // Delete movie
        this.get('#/delete/:id', deleteMyMovie);

        // Like movie
        this.get('#/details/like/:id', like);
    });

    app.run();
});