window.addEventListener('load', () => {

    const input = document.querySelector('#location');
    const mainDiv = document.querySelector('#forecast');
    const todayDiv = document.querySelector('#current');
    const upcomingDiv = document.querySelector('#upcoming');

    document.querySelector('#submit').addEventListener('click', getForecast);

    function getForecast() {
        const locationName = input.value;
        const code = getCode(locationName);
        const today = getToday(code);
        const upcoming = getUpcoming(code);
    }
});

const url = 'https://judgetests.firebaseio.com';

function getCode(name) {
    fetch(`${url}/locations.json`)
        .then(res => res.json())
        .then(data => {
            Object.values(data).forEach(el => {
                if (el.name === name) {
                    console.log(el.code);
                    return el.code;
                }
            });
        });
}

function getToday(code) {
    fetch(`${url}/forecast/today/${code}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        });
}

function getUpcoming(code) {
    fetch(`${url}/forecast/upcoming/${code}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        });
}


// function attachEvents() {
//     console.log("TODO...");
// }
//
// attachEvents();