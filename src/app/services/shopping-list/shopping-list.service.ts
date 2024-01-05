import { Injectable } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsUpdated = new Subject<Ingredient[]>();
  startedEditingIngredient = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Butter Sticks', 10),
    new Ingredient('Tomatoes', 5),
    new Ingredient('Apples', 40),
  ];

  constructor() {}

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

}