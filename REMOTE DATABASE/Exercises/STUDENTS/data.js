const appId = '657B8CD6-EE88-F3BD-FF05-24405A958700';
const apiKey = '86BD0E07-2C1D-4433-BB68-B3C36B22CE59'

function url(endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoint}`;
}

export async function getStudents() {
    const response = await fetch(url('students'));
    const data = await response.json();

    return data;
}

export async function createStudent(student) {
    const response = await fetch(url('students'), {
        method: 'POST',
        body: JSON.stringify(student),
    });
    const data = await response.json();

    return data;
}