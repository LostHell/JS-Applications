// TODO
/*  global $, Sammy */

import home from './controllers/home.js';
import about from './controllers/about.js';
import login, {loginPost, logout} from './controllers/login.js';
import register, {registerPost} from './controllers/register.js';
import catalog from './controllers/catalog.js';
import details from './controllers/details.js';
import create, {createPost} from './controllers/create.js';
import edit from './controllers/edit.js';

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');
        // this === Sammy.Application

        this.userData = {
            loggedIn: false,
            hasTeam: false,
        };

        // Home page
        this.get('/', home);
        this.get('/index.html', home);
        this.get('#/home', home);

        // About page
        this.get('#/about', about);

        // Login page
        this.get('#/login', login);
        this.post('#/login', (ctx) => {
            loginPost.call(ctx);
        });

        //Logout page
        this.get('#/logout', logout);

        // Register page
        this.get('#/register', register);
        this.post('#/register', (ctx) => {
            registerPost.call(ctx);
        });

        // Catalog page
        this.get('#/catalog', catalog);
        this.get('#/catalog/:id', catalog);
        this.get('#/details/:id', details);

        // Create page
        this.get('#/create', create);
        this.post('#/create', (ctx) => {
            createPost.call(ctx);
        });

        // Edit page
        this.get('#/edit/:id', edit);


        //// OR

        // this.loadPartials({
        //     header: './templates/common/header.hbs',
        //     footer: './templates/common/footer.hbs'
        // }).then(function () {
        //     this.partial('./templates/home/home.hbs');
        // });

        //// OR

        // this.render('./templates/home/home.hbs').then(function (html) {
        //     this.swap(html);
        // });

        // Controllers!

        // Save Users sessions

        // How to give sessions in Controllers
    });

    app.run();
});

// window.addEventListener('load', () => {
//
// });