import home from "./controllers/home.js";
import {login, signIn, register, signUp, logout} from "./controllers/user.js";
import {recipe, create} from "./controllers/recipe.js";

window.addEventListener('load', () => {

    const app = Sammy('#rooter', function () {
        this.use('Handlebars', 'hbs');

        if (sessionStorage.getItem('userToken')) {
            this.userData = {
                loggedIn: true,
                names: sessionStorage.getItem('names')
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
        this.get('#/login', login);
        this.post('#/login', (ctx) => {
            signIn.call(ctx);
        });

        // Register page
        this.get('#/register', register);
        this.post('#/signUp', (ctx) => {
            signUp.call(ctx);
        });

        // Logout page
        this.get('#/logout', logout);

        // Recipe page
        this.get('#/shareRecipe', recipe);
        this.post('#/create', (ctx) => {
            create.call(ctx);
        });
    });

    app.run();
});