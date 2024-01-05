import { Ingredient } from "./ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public requiredIngredients?: Ingredient[]

    constructor(name: string, desc: string, imagePath: string, requiredIngredients?: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.requiredIngredients = requiredIngredients;

    }

    setRequiredIngredients(req: Ingredient[]) {
        this.requiredIngredients = req;
    }
}