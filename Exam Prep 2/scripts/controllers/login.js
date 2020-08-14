import {login, logout} from "../data.js";

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/home.hbs', this.app.userData);
}

export async function newLogin() {
    await login(this.params.email, this.params.password);
    this.app.userData.loggedIn = true;
    return this.redirect('/');
}

export async function logMeOut() {
    await logout();
    this.app.userData.loggedIn = false;
    return this.redirect('/');
}