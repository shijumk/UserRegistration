import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SETTINGS } from '../config/config-user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  postUserData(userData): Observable<any> {
    return this.http.post(SETTINGS.api.apiEndpoint, userData);
  }
}
