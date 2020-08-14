import {login, logout as signout} from "../data.js";

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/login/login.hbs', this.app.userData);
}

export async function logme() {
    await login(this.params.username, this.params.password);
    this.app.userData.loggedIn = true;
    this.app.userData.username = localStorage.getItem('username');
    this.redirect('/');
}

export async function logout() {
    await signout();
    this.app.userData.loggedIn = false;
    this.redirect('/');
}