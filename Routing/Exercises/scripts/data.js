const appId = '7A9C1EAC-93CE-B90B-FFE7-94C783DCA000';
const apiKey = '21717BA6-428F-45F9-B317-F918E05018BC';

function host(endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    TEAMS: 'data/teams',
    LOGOUT: 'users/logout'
};

export async function register(username, password, repeatPassword) {
    return (await fetch(host(endpoints.REGISTER), {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })).json();
}

export async function login(username, password) {
    return (await fetch(host(endpoints.LOGIN), {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            login: username,
            password: password
        })
    })).json();
}

export async function logout() {
    const token = localStorage.getItem('user-token');
    if (!token) {
        throw new Error('User is not logged in!');
    }
    return  fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token,
        },
        method: 'GET'
    });
}

export async function createTeam(team) {
    const token = localStorage.getItem('user-token');
    if (!token) {
        throw new Error('User is not logged in!');
    }
    return (await fetch(host(endpoints.TEAMS), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        method: 'POST',
        body: JSON.stringify(team)
    })).json();
}

export async function getTeams() {
    return (await fetch(host(endpoints.TEAMS))).json();
}

export async function getTeamById(id) {
    return (await fetch(host(endpoints.TEAMS + '/' + id))).json();
}