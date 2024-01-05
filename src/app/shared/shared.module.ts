import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { HeaderComponent } from "./header/header.component";
import { PlaceholderDirective } from "./directives/placeholder.directive";
import { DropdownDirective } from "./directives/dropdown.directive";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ], 
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {

}