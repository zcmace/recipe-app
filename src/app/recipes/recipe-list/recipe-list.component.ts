import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('TestRecipe', 'Test description for recipe', 'https://picsum.photos/seed/adbc123/500'),
    new Recipe('AnotherRecipe', 'Woo Recipes', 'https://picsum.photos/seed/gadc123/500')
  ];
  
  constructor() {

  }

  ngOnInit() {

  }

  getRecipeDetails(recipe: Recipe){
    this.recipeSelected.emit(recipe);
  }

}
