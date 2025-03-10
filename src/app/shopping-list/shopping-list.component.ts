import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  ingredientSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubscription = this.shoppingListService.ingredientsUpdated.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  onEditIngredient(index: number): void {
    this.shoppingListService.startedEditingIngredient.next(index);
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }
}


