const appId = 'F7274C7B-4039-000B-FFFD-74A57B324000';
const apiKey = 'FC4807ED-5520-4778-B594-5FBE835E2CD1';

function url(endpoint) {
return `https://api.backendless.com/${appId}/${apiKey}/${endpoint}`;
}

const endpoints = {
    LOGIN: 'users/login',
    REGISTER: 'users/register',
    LOGOUT: 'users/logout',
    BOOKS: 'data/books',
    BOOK_BY_ID: 'data/books/'
}

export async function register(email, password) {
    return (await fetch(url(endpoints.REGISTER), {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        })
    })).json();
}

export async function login(email, password) {
    const result = await (await fetch(url(endpoints.LOGIN), {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            login: email,
            password: password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('email', result.email);
    localStorage.setItem('userId', result.objectId);

    return result;
}

export function logout() {
    const token = localStorage.getItem('userToken');

    localStorage.removeItem('userToken');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');

    return fetch(url(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });
}

export async function getBooks() {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.BOOKS), {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getBookById(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.BOOK_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function createBook(book) {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.BOOKS), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'POST',
        body: JSON.stringify(book)
    })).json();
}

export async function editBook(id, updatedProps) {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.BOOK_BY_ID + id), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'PUT',
        body: JSON.stringify(updatedProps)
    })).json();
}

export async function deleteBook(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.BOOK_BY_ID + id), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'DELETE'
    })).json();
}