import { Component } from '@angular/core';
 
import { HeaderComponent } from "./Components/header/header.component";
 

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ HeaderComponent]
})
export class AppComponent {
  title = 'Dashboard';
}
