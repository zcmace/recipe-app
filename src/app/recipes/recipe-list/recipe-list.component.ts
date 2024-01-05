import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../services/recipe/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[]
  recipeUpdatedSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeUpdatedSubscription = this.recipeService.recipesUpdated.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.recipeUpdatedSubscription.unsubscribe();
  }

}
