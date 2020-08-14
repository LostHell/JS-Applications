let url = `https://judgetests.firebaseio.com/schedule/depot.json`;

function solve() {
    const info = document.querySelector('span[class=info]');
    const inputDepart = document.querySelector('#depart');
    const inputArrive = document.querySelector('#arrive');

    let station = 'depot';

    function depart() {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                info.textContent = `Next stop ${Object.values(data)[0]}`;
                inputDepart.setAttribute('disabled', true);
                inputArrive.removeAttribute('disabled');
            });
    }

    function arrive() {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                info.textContent = `Arriving at ${Object.values(data)[0]}`;
                url = url.replace(`${station}`, Object.values(data)[1]);
                inputDepart.removeAttribute('disabled');
                inputArrive.setAttribute('disabled', true);
                station = Object.values(data)[1];
            });
    }

    return {
        depart,
        arrive
    };
}

let result = solve();