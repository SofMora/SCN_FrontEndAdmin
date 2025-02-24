import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8080";

//var apiUrl = "http://192.168.10.10:105";

var httpLink = {
  getAllCourse: apiUrl + "/api/course/getAllCourse",
  saveCourse: apiUrl + "/api/course/saveCourse",
  deleteCourseById: apiUrl + "/api/course/deleteCourseById",
  getCourseDetailById: apiUrl + "/api/course/getCourseDetailById",
  getAllProfessors: apiUrl + "/api/professor/getAllProfessor",
  getwithprofessor: apiUrl+"/api/course/getwithprofessor"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllCourse(): Observable<any> {
    return this.webApiService.get(httpLink. getAllCourse);
  }

  public getAllProfessors(): Observable<any> {
    return this.webApiService.get(httpLink. getAllProfessors);
  }

  public saveCourse(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveCourse, model);
  }


  public deleteCourseById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteCourseById + '/' + model,"" );
  }

  public getCourseDetailById(): Observable<any> {
    return this.webApiService.get(httpLink.getCourseDetailById);
  }
  public getwithprofessor(): Observable<any> {
    return this.webApiService.get(httpLink.getwithprofessor);
  }
  
}
