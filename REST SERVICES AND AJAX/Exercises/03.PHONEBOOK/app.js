function attachEvents() {
    const url = 'http://localhost:8000/phonebook';
    const elements = {
        person() {
            return document.querySelector('input#person');
        },
        phone() {
            return document.querySelector('input#phone');
        },
        createContact() {
            return document.querySelector('button#btnCreate');
        },
        loadContacts() {
            return document.querySelector('button#btnLoad');
        }
    };

    elements.createContact().addEventListener('click', () => {
        const {value: person} = elements.person();
        const {value: phone} = elements.phone();

        fetch(url, {
            headers: {'Content-type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({person, phone}),
        })
            .then(res => res.json());

        elements.person().value = '';
        elements.phone().value = '';
    });

    elements.loadContacts().addEventListener('click', () => {

        const ul = document.querySelector('ul');
        ul.textContent = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                for (const value of Object.values(data)) {

                    const li = document.createElement('li');
                    const btnDelete = document.createElement('button');

                    btnDelete.textContent = 'Delete';
                    li.textContent = `${value.person}: ${value.phone}`;
                    li.appendChild(btnDelete);
                    ul.appendChild(li);
                }
            });
    });
}

attachEvents();