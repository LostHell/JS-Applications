import {getMovies} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    const movies = await getMovies();
    this.app.userData.isEmpty = false;
    if (movies.length === 0) {
        this.app.userData.isEmpty = true;
    }

    const data = Object.assign({movies}, this.app.userData);

    this.partial('./templates/home.hbs', data);
}