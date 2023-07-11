import { Ingredient } from "./ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public requiredIngredients?: Map<Ingredient, number>;

    constructor(name: string, desc: string, imagePath: string, requiredIngredients?: Map<Ingredient, number>) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.requiredIngredients = requiredIngredients;

    }

    setRequiredIngredients(req: Map<Ingredient, number>) {
        this.requiredIngredients = req;
    }
}