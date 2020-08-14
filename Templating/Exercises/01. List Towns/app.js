window.addEventListener('load', () => {
    const templString = document.getElementById('main-template').innerHTML;
    Handlebars.registerPartial('town', document.getElementById('town-template').innerHTML);
    const rootEl = document.querySelector('#root');
    const input = document.querySelector('#towns');

    document.querySelector('#btnLoadTowns').addEventListener('click', (e) => {
        e.preventDefault();

        const towns = input.value.split(', ');
        console.log(towns);

        const templFn = Handlebars.compile(templString);

        const generatedHtml = templFn({towns});
        rootEl.innerHTML = generatedHtml;
    });
});