import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  recipes: Recipe[] = [
    new Recipe('TestRecipe', 'Test description for recipe', 'https://picsum.photos/200/300'),
    new Recipe('AnotherRecipe', 'Woo Recipes', 'https://picsum.photos/200/300')
  ];
  
  constructor() {

  }

  ngOnInit() {

  }
}
