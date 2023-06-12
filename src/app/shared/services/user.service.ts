import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {map} from "rxjs/operators";

import {User} from "../models/user.model";

@Injectable()
export class UserService{
  constructor(private http: HttpClient){}
  getUsers(email: string):Observable<User> {
      return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(map((user:any) => user[0] ? user[0] : undefined));
  }
  createUser(user:User){
    return this.http.post('http://localhost:3000/users', user);
  }
  deleteUser(email: string) {
    if (this.getUsers(email)) {
      this.http.delete(`http://localhost:3000/users?email=${email}`).subscribe();
    }
  }
}
