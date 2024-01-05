import { EventEmitter } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { Ingredient } from '../../../models/ingredient.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Burger',
      'thats a tasty burger',
      'https://i5.walmartimages.com/seo/Marketside-Flame-Broiled-Angus-Double-Cheeseburger-Sandwich-9-7-oz-1-Count_d17017d9-b962-4408-8bde-ed8e70c97451.d67fd46e7ea7b7d5d89e5f202904742d.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
      [
        new Ingredient('Beef', 2),
        new Ingredient('Cheese', 2),
        new Ingredient('Buns', 2),
        new Ingredient('Lettuce', 1)
      ]  
      ),
    new Recipe(
      'Taco',
      'Beef taco',
      'https://funwithoutfodmaps.com/wp-content/uploads/2022/07/Low-FODMAP-Beef-Tacos-Hero.jpg',
      [
        new Ingredient('Beef', 1),
        new Ingredient('Cheese', 1),
        new Ingredient('Shell', 1),
        new Ingredient('Lettuce', 2),
        new Ingredient('Taco Seasoning', 1)
      ]
    )
  ];
  recipeSelected = new EventEmitter<Recipe>();

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }

}
