import {register} from "../data.js";

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    // , this.app.userData

    this.partial('./templates/user/register.hbs', this.app.userData);
}

export async function newRegister() {
    await register(this.params.email, this.params.password);
    return this.redirect('/');
}