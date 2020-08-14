import {recipes} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const allRecipes = await recipes();

    const data = Object.assign({allRecipes}, this.app.userData);

    this.partial('./templates/home.hbs', data);
}