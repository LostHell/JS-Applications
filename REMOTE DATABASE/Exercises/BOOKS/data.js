const appId = '657B8CD6-EE88-F3BD-FF05-24405A958700';
const apiKey = '86BD0E07-2C1D-4433-BB68-B3C36B22CE59';

function url(endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoint}`;
}

export async function getBooks() {

    // return fetch(url('books'))
    //   .then(res => res.json());

    // OR

    const response = await fetch(url('books'));
    const data = await response.json();
    return data;
}

export async function createBook(book) {
    const response = await fetch(url('books'), {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function updateBook(book) {
    const id = book.objectId;
    const response = await fetch(url('books/' + id), {
        method: 'PUT',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function deleteBook(id) {
    const response = await fetch(url('books/' + id), {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}