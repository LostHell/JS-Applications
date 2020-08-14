const appId = 'D864AA0F-22DB-A3B8-FF19-7F737D3C6600';
const apiKey = '73E17273-1B31-40DC-9274-7AA650AAF7B8';

function url(endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/${endpoint}`;
}

const endpoints = {
    LOGIN: 'users/login',
    REGISTER: 'users/register',
    LOGOUT: 'users/logout',
    RECIPES: 'data/recipes',
    MOVIE_BY_ID: 'data/movies/'
}

export async function login(username, password) {
    const result = await (await fetch(url(endpoints.LOGIN), {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            login: username,
            password: password
        })
    })).json();

    sessionStorage.setItem('userToken', result['user-token']);
    sessionStorage.setItem('names', result.firstName + ' ' + result.lastName);
    sessionStorage.setItem('userId', result.objectId);

    return result;
}

export async function register(firstName, lastName, username, password) {
    return (await fetch(url(endpoints.REGISTER), {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        })
    })).json();
}

export function logout() {
    const token = sessionStorage.getItem('userToken');

    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('names');
    sessionStorage.removeItem('userId');

    return fetch(url(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });
}

export async function recipes() {
    return (await fetch(url(endpoints.RECIPES), {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })).json();
}

export async function createNewRecipe(recipe) {
    const token = sessionStorage.getItem('userToken');
    return (await fetch(url(endpoints.RECIPES), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'POST',
        body: JSON.stringify(recipe)
    })).json();
}