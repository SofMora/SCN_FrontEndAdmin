import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8080";


var httpLink = {
  getAllStudents: apiUrl + "/api/student/getAllStudents",
  getPendingStudents: apiUrl + "/api/student/getPendingStudents",
  approvalStudent: apiUrl + "/api/student/approvalStudent",
  denegateStudent: apiUrl + "/api/student/denegateStudent"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllStudents(): Observable<any> {
    return this.webApiService.get(httpLink.getAllStudents);
  }

  public getPendingStudents(): Observable<any> {
    return this.webApiService.get(httpLink.getPendingStudents);
  }

  public approvalStudent(model: any): Observable<any> {
    return this.webApiService.post(httpLink.approvalStudent + '/' + model, "");
  }

  public denegateStudent(model: any): Observable<any> {
    return this.webApiService.post(httpLink.denegateStudent + '/' + model, { statusStudent: false });
  }

}

