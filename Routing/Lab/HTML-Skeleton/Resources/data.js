// $(() =>
//     console.log()
// );

(function () {
    const templates = {};
    const loadingBox = document.getElementById('loadingBox');
    const infoBox = document.getElementById('infoBox');
    const errorBox = document.getElementById('errorBox');

    function toggleLoader(showLoader) {
        if (showLoader) {
            loadingBox.style.display = 'inline';
            return;
        }
        loadingBox.style.display = 'none'
    }

    function render(templatePath, templateContext, swapFn) {
        return getTemplate(templatePath)
            .then(templateFn => {
                swapFn(templateFn(templateContext));
            });
    }

    function getTemplate(templatePath) {
        const existingTemplate = templates[templatePath];
        if (existingTemplate) {
            return Promise.resolve(existingTemplate);
        }

        fetch(`/templates/${templatePath}.hbs`)
            .then(res => res.text())
            .then(templateString => {
                const template = Handlebars.compile(templateString);
                templates[templatePath] = template;
                return template;
            })
            .catch(err => {
                console.log(err)
            });
    }

    const app = Sammy('#container', function () {
        this.before({}, function () {
            toggleLoader(true);
        })
        this.get('/', function () {
            render('home', {}, this.swap.bind(this));
            toggleLoader(false);
        });
        this.get('/profile', function () {
            render('profile-page', {}, this.swap.bind(this));
            toggleLoader(false);
        });
        this.get('/create-furniture', function () {
            render('create-furniture', {}, this.swap.bind(this));
            toggleLoader(false);
        });
        this.get('/details-furniture/:id', function () {
            render('create-furniture', {}, this.swap.bind(this));
            toggleLoader(false);
        });
    });

    app.run('/');
}());