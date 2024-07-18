import { Component, HostListener } from '@angular/core';
import {RouterLink} from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AutoCompleteModule,InputTextModule,RouterLink,FormsModule,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  {
  value: number | undefined;

  isActive:boolean=false;
    shadowHeader:boolean=false;
    isScrollOver50: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,private router: Router){

  }
  @HostListener('window:scroll', ['$event'])
    
  onScroll(event: Event) {
    this.isScrollOver50 = window.scrollY > 50;
  }
  

 
 
}
