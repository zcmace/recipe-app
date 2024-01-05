import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  apiBase = 'https://ng-course-recipe-book-zmace-default-rtdb.firebaseio.com'
  recipesUrl = '/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
    ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const url = this.apiBase + this.recipesUrl;
    this.http.put(url, recipes).subscribe((response) => {
      console.log(response)
    });
  }

  fetchRecipes() {
    const url = this.apiBase + this.recipesUrl;
    return this.http.get(url).pipe(
      map((recipes: Recipe[]) => {
        return recipes.map((recipe) => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }));
  }

}
