import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { User } from '../interfaces/users-interface';
import { BehaviorSubject, map, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userdata:string;
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();
  constructor(private http: HttpClient) { 
    this.userdata = environment.userData;
    this.loadUsers();
  }

  private loadUsers(): void {
    this.http.get<User[]>(this.userdata).subscribe(data => {
      this.usersSubject.next(data);
    });
  }
/*   getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userdata);
  } */

  getUserById(id: number): Observable<User> {
    return this.users$.pipe(
      map(users => users.find(user => user.id === id))
    );
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return this.users$; // If the search term is empty, return all users
    }
  
    return this.users$.pipe(
      map(users => users.filter(user =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.username.toLowerCase().includes(term.toLowerCase())
      ))
    );
  }
}
