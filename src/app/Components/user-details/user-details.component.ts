import { Component, OnInit, ViewChild } from '@angular/core';
 
 
import {UserDataService} from '../../services/user-data.service'
 
import { CommonModule } from '@angular/common';
 
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
 
 
import { User } from '../../interfaces/users-interface';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent  {
  user: User | undefined;
  
constructor(private UserDataService:UserDataService,private activatedRoute: ActivatedRoute ){}

ngOnInit(): void {
  const id = +this.activatedRoute.snapshot.paramMap.get('searchUser')!;
  console.log(id)
  this.UserDataService.getUserById(id).subscribe((data) => {
    this.user = data;
     console.log( this.user)
     
  });
}
}