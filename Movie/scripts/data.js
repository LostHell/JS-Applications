const appId = 'BB195FED-0B4B-9B69-FF16-5D83A8EC8400';
const apiKey = '2F9770E5-2629-447F-B871-AFD99B96C71F';

function host(endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/${endpoint}`;
}

const endpoints = {
    LOGIN: 'users/login',
    REGISTER: 'users/register',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
}

export async function register(username, password) {
    return (await fetch(host(endpoints.REGISTER), {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })).json();
}

export async function login(username, password) {
    const result = await (await fetch(host(endpoints.LOGIN), {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                login: username,
                password: password
            })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    return result;
}

export function logout() {
    const token = localStorage.getItem('userToken');

    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    return fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });
}

// get all movies
export async function getMovies() {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();
}

// get movie by id
export async function getMovieById(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();
}

// create movie
export async function createMovie(movie) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'POST',
        body: JSON.stringify(movie)
    })).json();
}

// edit movie
export async function editMovie(id, updatedProps) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'PUT',
        body: JSON.stringify(updatedProps)
    })).json();
}

// delete movie
export async function deleteMovie(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'DELETE'
    })).json();
}

// buy ticket
export async function buyTicket(movie) {
    const token = localStorage.getItem('userToken');

    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId;

    return editMovie(movieId, {tickets: newTickets});
}

// get movies by user ID
export async function getMoviesByOwner(ownerId) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'user-token': token
        }
    })).json();
}