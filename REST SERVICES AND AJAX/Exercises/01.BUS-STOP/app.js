function getInfo() {
    const baseUrl = `https://judgetests.firebaseio.com/businfo/{stopId}.json`;
    const validIDs = ['1287', '1308', '1327', '2334'];

    const elements = {
        stopId() {
            return document.querySelector('input#stopId');
        },
        stopName() {
            return document.querySelector('div#stopName');
        },
        buses() {
            return document.querySelector('ul#buses');
        },
    };

    const currentStopId = elements.stopId().value;

    elements.stopId().value = '';
    elements.stopName().textContent = '';
    elements.buses().textContent = '';

    if (!validIDs.includes(currentStopId)) {
        elements.stopName().textContent = 'Error';
        return;
    }
    const url = baseUrl.replace('{stopId}', currentStopId);
    fetch(url)
        .then((x) => x.json())
        .then((data) => showInfo(data));

    function showInfo(data) {
        elements.stopName().textContent = data.name;
        for (const [key, value] of Object.entries(data.buses)) {
            const li = document.createElement('li');
            li.textContent = `Bus ${key} arrives in ${value} minutes`
            elements.buses().appendChild(li);
        }
    }
}