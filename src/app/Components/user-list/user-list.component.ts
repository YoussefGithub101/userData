import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {UserDataService} from '../../services/user-data.service'
import { User } from '../../interfaces/users-interface';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatPaginator,MatInputModule,MatTableModule,MatPaginatorModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements  AfterViewInit,OnInit {
  loading:boolean=true;
  displayedColumns: string[] = ['id', 'name','username', 'email', 'phone'];
  dataSource = new MatTableDataSource<User>([]);
  errorMessage: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  users$: Observable<User[]> | undefined;
  searchControl = new FormControl('');


  
constructor(private UserDataService:UserDataService , private router: Router){}
  ngOnInit(): void {
    this.users$ = this.UserDataService.users$;
   
    this.users$.subscribe(data => {
      this.dataSource.data = data;
      setInterval(() => { this.loading=false }, 500)
       
    });
    this.searsh()
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  
  }
 
  navigateToUser(user: User): void {
    this.router.navigate(['/profile', user.id]);
  }
  

  searsh(){
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.UserDataService.searchUsers(term ?? ''))
    ).subscribe(filteredUsers => {
       
      this.dataSource.data = filteredUsers;
  
      console.log(this.dataSource.data.length)
    });
  }
 
}

 