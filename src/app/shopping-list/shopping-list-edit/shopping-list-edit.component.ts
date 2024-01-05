import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) form: NgForm;
  editIngredientSubscription: Subscription;
  editMode = false;
  editedIngredientIndex: number;
  editedIngredient: Ingredient

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.editIngredientSubscription = this.shoppingListService.startedEditingIngredient.subscribe((index: number) => {
      this.editMode = true;
      this.editedIngredientIndex = index;
      this.editedIngredient = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      })
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIngredientIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onDeleteItem(): void {
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.editIngredientSubscription.unsubscribe();
  }

}
