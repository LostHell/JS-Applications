import {register} from "../data.js";

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/register/register.hbs', this.app.userData);
}

export async function newRegister() {
    if (this.params.username.length < 5) {
        alert('Sorry but username must be minimum 5 characters short!');
        return;
    } else if (this.params.password.length < 5 || this.params.password !== this.params.repeatPassword) {
        alert('Sorry password must be minimum 5 characters short and must match repeat password!');
        return;
    }
    await register(this.params.username, this.params.password);
    this.redirect('#/login');
}