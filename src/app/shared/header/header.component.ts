import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../../services/data-storage/data-storage.service";
import { Recipe } from "../../../models/recipe.model";
import { RecipeService } from "../../services/recipe/recipe.service";
import { AuthService } from "../../services/auth/auth.service";
import { Subscription } from "rxjs";
import { User } from "../../auth/user.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;
    constructor(
            private dataStorageService: DataStorageService,
            private recipeService: RecipeService,
            private authService: AuthService,
            private route: ActivatedRoute,
            private router: Router
        ){}
    
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe((user: User) => {
            this.isAuthenticated = !!user;
        });
    }

    onSaveData(): void {
        this.dataStorageService.storeRecipes();
    }

    onFetchData(): void {
        this.dataStorageService.fetchRecipes().subscribe((recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
        });
    }
    
    onLogOut() {
        this.authService.logOut();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

}