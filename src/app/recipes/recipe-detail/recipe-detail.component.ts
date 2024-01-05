import { Component, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) {}

  sendIngredientsToShoppingList(): void {
    this.shoppingListService.addIngredients(this.recipe.requiredIngredients)
  }

}
