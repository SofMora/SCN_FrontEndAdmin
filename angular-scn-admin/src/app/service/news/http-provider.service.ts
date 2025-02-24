import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8080";

var httpLink = {
  getAllNews: apiUrl + "/api/news/getAllNews",
  saveNews: apiUrl + "/api/news/saveNews",
  deleteNewsById: apiUrl + "/api/news/deleteNewsById",
  getNewsDetailById: apiUrl + "/api/news/getNewsDetailById"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllNews(): Observable<any> {
    return this.webApiService.get(httpLink.getAllNews);
  }

  public saveNews(formData: FormData): Observable<any> {
    return this.webApiService.post(httpLink.saveNews,formData);
  }

  public deleteNewsById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.deleteNewsById + '/' + model );
  }

  public getNewsDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink. getNewsDetailById);
  }

}
