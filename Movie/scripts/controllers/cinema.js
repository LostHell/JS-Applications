import {getMovies} from "../data.js";

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const movies = await getMovies();

    const data = Object.assign({movies}, this.app.userData);

    this.partial('./templates/movie/catalog.hbs', data);
}