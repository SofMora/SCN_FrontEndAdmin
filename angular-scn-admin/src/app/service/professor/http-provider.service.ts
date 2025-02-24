import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8080";

var httpLink = {
  getAllProfessor: apiUrl + "/api/professor/getAllProfessor",
  saveProfessor: apiUrl + "/api/professor/saveProfessor",
  updateProfessor: apiUrl + "/api/professor/updateProfessor",
  deleteProfessorById: apiUrl + "/api/professor/deleteProfessorById",
  getProfessorDetailById: apiUrl + "/api/professor/getProfessorDetailById"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllProfessor(): Observable<any> {
    return this.webApiService.get(httpLink.getAllProfessor);
  }

  public saveProfessor(professor: any): Observable<any> {
    return this.webApiService.post(httpLink.saveProfessor, professor);
  }

  public updateProfessor(professor: any): Observable<any> {
    return this.webApiService.post(httpLink.updateProfessor, professor);
  }

  public deleteProfessorById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteProfessorById + '/' + model, "");
  }

  public getProfessorDetailById(): Observable<any> {
    return this.webApiService.get(httpLink.getProfessorDetailById);
  }
}
