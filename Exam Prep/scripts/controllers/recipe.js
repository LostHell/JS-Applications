import {createNewRecipe} from "../data.js";

export async function recipe() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/recipe/recipe.hbs', this.app.userData);
}

export async function create() {
    const newRecipe = {
        meal: this.params.meal,
        prepMethod: this.params.prepMethod,
        likesCounter: this.params.likesCounter,
        ingredients: this.params.ingredients,
        foodImageURL: this.params.foodImageURL,
        description: this.params.description,
        category: this.params.category,
        categoryImageURL: this.params.categoryImageURL
    }
    await createNewRecipe(newRecipe);
    return this.redirect('/');
}