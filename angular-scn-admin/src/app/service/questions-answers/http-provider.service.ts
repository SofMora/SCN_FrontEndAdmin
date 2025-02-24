import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8080";


var httpLink = {
  getAllAppointmentComment: apiUrl + "/api/appointmentComment/getAllAppointmentComment",
  getAllAppointmentCommentDetailById: apiUrl + "/api/appointmentComment/getAllAppointmentCommentDetailById",
  saveAppointmentComment: apiUrl + "/api/appointmentComment/saveAppointmentComment",
  deleteAppointmentCommentById: apiUrl + "/api/appointmentComment/deleteAppointmentCommentById",
  findCommentConsult: apiUrl + "/api/appointmentComment/findCommentConsult"
  
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllAppointmentComment(): Observable<any> {
    return this.webApiService.get(httpLink.getAllAppointmentComment);
  }

  public getAllAppointmentCommentDetailById(): Observable<any> {
    return this.webApiService.get(httpLink.getAllAppointmentCommentDetailById);
  }

  public saveAppointmentComment(appointmentComment: any): Observable<any> {
    return this.webApiService.post(httpLink.saveAppointmentComment, appointmentComment,{ observe: 'response' });
  }

  public deleteAppointmentCommentById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteAppointmentCommentById + '/' + model, "",{ observe: 'response' });
  }

  public findCommentConsult(): Observable<any> {
    return this.webApiService.get(httpLink.findCommentConsult);
  }

}
