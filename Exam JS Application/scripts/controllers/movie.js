import {getMovieById, createMovie, editMovie, deleteMovie, searchMovie} from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/movie/create.hbs', this.app.userData);
}

export async function getMovie() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const movie = await getMovieById(this.params.id);
    this.app.userData.isCreator = false;

    if (movie.creator === localStorage.getItem('email')) {
        this.app.userData.isCreator = true;
    }

    const data = Object.assign({movie}, this.app.userData)

    this.partial('./templates/movie/details.hbs', data);
}

export async function create() {
    if (this.params.title.length === 0 || this.params.description.length === 0 || this.params.imageUrl.length === 0) {
        alert('Invalid inputs!');
        return;
    }

    const newMovie = {
        name: this.params.title,
        creator: localStorage.getItem('email'),
        imageUrl: this.params.imageUrl,
        description: this.params.description,
        ownerId: localStorage.getItem('userId')
    }
    await createMovie(newMovie);
    this.redirect('#/');
}

export async function movieToEdit(currentMovie) {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const movie = await getMovieById(currentMovie.params.id);

    const data = Object.assign({movie}, this.app.userData)

    this.partial('./templates/movie/edit.hbs', data);
}

export async function editMyMovie() {
    const id = this.params.id;
    const update = {
        name: this.params.title,
        description: this.params.description,
        imageUrl: this.params.imageUrl
    }

    await editMovie(id, update);

    return this.redirect(`#/details/${id}`);
}

export async function deleteMyMovie() {
    const movieId = this.params.id;
    const movie = await deleteMovie(movieId);

    this.redirect('#/');
}

export async function like(movie) {
    const id = movie.params.id;

    this.app.userData.isLiked = false;

    if (!this.app.userData.moviesId.includes(id.toString())) {
        this.app.userData.moviesId.push(id.toString());
        this.app.userData.isLiked = true;
    }

    const currentMovie = await getMovieById(id);
    const newLikes = currentMovie.likes + 1;
    await editMovie(id, {likes: newLikes});

    return this.redirect(`#/details/${id}`);
}

export async function findMovieByName() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    const movies = await searchMovie(this.params.title);

    const data = Object.assign({movies}, this.app.userData);

    this.partial('./templates/home.hbs', data);
}