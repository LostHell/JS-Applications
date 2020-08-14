import {login as signMeIn} from "../data.js";
import {register as signMeUp} from "../data.js";
import {logout as logMeOut} from "../data.js";

export async function login() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/user/login.hbs', this.app.userData);
}

export async function signIn() {
    if (this.params.username.length <= 4) {
        alert('Username is wrong!');
        return;
    } else if (this.params.password.length <= 4) {
        alert('Password is wrong!');
        return;
    }

    await signMeIn(this.params.username, this.params.password);

    this.app.userData.loggedIn = true;
    this.app.userData.username = sessionStorage.getItem('username');
    this.app.userData.names = sessionStorage.getItem('names');

    return this.redirect('#/');
}

export async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/user/register.hbs', this.app.userData);
}

export async function signUp() {
    if (this.params.firstName.length <= 3) {
        alert('First name must be minimum 4 characters!');
        return;
    } else if (this.params.lastName.length <= 3) {
        alert('Last name must be minimum 4 characters!');
        return;
    } else if (this.params.username.length <= 4) {
        alert('Username must be minimum 5 characters!');
        return;
    } else if (this.params.password.length <= 4) {
        alert('Password must be minimum 5 characters!');
        return;
    } else if (this.params.password !== this.params.repeatPassword || this.params.password.length !== this.params.repeatPassword.length) {
        alert('Password doesn\'t mach repeat password');
        return;
    }

    await signMeUp(this.params.firstName, this.params.lastName, this.params.username, this.params.password);
    return this.redirect('#/login');
}

export async function logout() {
    await logMeOut();
    this.app.userData.loggedIn = false;
    return this.redirect('#/');
}