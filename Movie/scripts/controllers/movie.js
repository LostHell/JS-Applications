import {createMovie, getMoviesByOwner, getMovieById, editMovie, deleteMovie} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/movie/create.hbs', this.app.userData);
}

export async function create() {
    if (this.params.title.length < 5) {
        alert('Sorry title must be minimum 5 characters short!');
        return;
    } else if (Number(this.params.tickets) <= 0) {
        alert('Sorry tickets cannot be below or equal to 0');
        return;
    }
    const newMovie = {
        title: this.params.title,
        image: this.params.imageUrl,
        description: this.params.description,
        genres: this.params.genres,
        tickets: Number(this.params.tickets),
        ownerId: localStorage.getItem('userId')
    }
    await createMovie(newMovie);
    this.redirect('#/cinema');
}

export async function myMovies() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const ownerId = localStorage.getItem('userId');
    const movies = await getMoviesByOwner(ownerId);

    const data = Object.assign({movies}, this.app.userData)

    this.partial('./templates/movie/mymovie.hbs', data);
}

export async function editMyMovie(currentMovie) {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const movie = await getMovieById(currentMovie.params.id);

    const data = Object.assign({movie}, this.app.userData)

    this.partial('./templates/movie/edit.hbs', data);
}

export async function deleteMyMovie() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    const movieId = this.params.id;
    const movie = await deleteMovie(movieId);
    const data = Object.assign({movie}, this.app.userData)

    this.partial('./templates/movie/mymovies.hbs', data);
    this.redirect('#/mymovies');
}