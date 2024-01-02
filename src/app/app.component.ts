import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature: string = 'recipe';
  
  showRecipe: boolean = true;
  onNavigate(event: string) {
    this.loadedFeature = event;
  }
}
