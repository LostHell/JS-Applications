import * as api from './data.js';

window.addEventListener('load', () => {
    const tbody = document.querySelector('tbody');

    async function getInfo() {
        const data = await api.getStudents();

        data.sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
            .forEach(s => tbody.appendChild(renderStudents(s)));
    }

    function renderStudents(student) {

        const tr = document.createElement('tr');
        const id = document.createElement('td');
        const firstName = document.createElement('td');
        const lastName = document.createElement('td');
        const facultyNumber = document.createElement('td');
        const grade = document.createElement('td');

        id.textContent = student.id;
        firstName.textContent = student.firstName;
        lastName.textContent = student.lastName;
        facultyNumber.textContent = student.facultyNumber;
        grade.textContent = student.grade.toFixed(2);

        tr.appendChild(id);
        tr.appendChild(firstName);
        tr.appendChild(lastName);
        tr.appendChild(facultyNumber);
        tr.appendChild(grade);

        return tr;
    }

    getInfo();
});