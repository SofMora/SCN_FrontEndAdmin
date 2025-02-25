import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8080";

var httpLink = {
  validateUser: apiUrl + "/api/administrator/validateUser"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }
  

  public validateUser(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.webApiService.post(`${httpLink.validateUser}`, loginData);
}

}
  
