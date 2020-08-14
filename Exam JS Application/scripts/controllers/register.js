import {register} from "../data.js";

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/user/register.hbs', this.app.userData);
}

export async function newRegister() {
    if (this.params.email.length < 5) {
        alert('Sorry but email must be minimum 5 characters short!');
        return;
    } else if (this.params.password.length < 6 || this.params.password !== this.params.repeatPassword) {
        alert('Sorry password must be minimum 6 characters short and must match repeat password!');
        return;
    }
    await register(this.params.email, this.params.password);
    this.redirect('#/login');
}