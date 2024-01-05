import { Component } from "@angular/core";
import { DataStorageService } from "../../services/data-storage/data-storage.service";
import { Recipe } from "../../../models/recipe.model";
import { RecipeService } from "../../services/recipe/recipe.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipeService){}
    
    onSaveData(): void {
        this.dataStorageService.storeRecipes();
    }

    onFetchData(): void {
        this.dataStorageService.fetchRecipes().subscribe((recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
        });
    }

}