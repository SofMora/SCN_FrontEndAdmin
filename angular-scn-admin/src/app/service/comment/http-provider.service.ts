import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8080";

var httpLink = {
  getAllComment: apiUrl + "/api/commentNews/getAllComment",
  deleteCommentById: apiUrl + "/api/commentNews/deleteCommentById",
  getCommentDetailById: apiUrl + "/api/commentNews/getCommentDetailById",
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllComment(): Observable<any> {
    return this.webApiService.get(httpLink.getAllComment);
  }

  public deleteCommentById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteCommentById + '/' + model, "");
  }

  public getCommentDetailById(): Observable<any> {
    return this.webApiService.get(httpLink.getCommentDetailById);
  }
  
}
