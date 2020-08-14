const appId = '4ACA10F6-5A40-3CFE-FF6A-FD6A26875200';
const apiKey = 'EFD13227-CFAB-4279-830D-450C80E17EF1';

function url(endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/${endpoint}`;
}

const endpoints = {
    LOGIN: 'users/login',
    REGISTER: 'users/register',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
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

export async function getMovies() {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getMovieById(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function createMovie(movie) {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.MOVIES), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'POST',
        body: JSON.stringify(movie)
    })).json();
}

export async function editMovie(id, updatedProps) {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'PUT',
        body: JSON.stringify(updatedProps)
    })).json();
}

export async function searchMovie(name) {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.MOVIES + `?where=name%3D%27${name}%27`), {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function deleteMovie(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(url(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'DELETE'
    })).json();
}