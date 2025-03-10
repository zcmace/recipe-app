import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: AuthComponent, }]),
        SharedModule
    ],
    exports: [RouterModule]
})
export class AuthModule {

}