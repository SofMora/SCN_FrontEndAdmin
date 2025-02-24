import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpProviderService } from '../service/questions-answers/http-provider.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-questions-answers-management',
  standalone: true,
  imports: [NgFor, NgIf, NgxPaginationModule, FormsModule],
  templateUrl: './questions-answers-management.component.html',
  styleUrl: './questions-answers-management.component.css'
})
export class QuestionsAnswersManagementComponent implements OnInit {
  
  appointmentComments: any[] = [];
  page: number = 1; // Página actual
  itemsPerPage: number = 15; // Elementos por página (valor predeterminado)

  selectedComment: any = null;  // Para almacenar el comentario seleccionado
  response: string = ''; // Para almacenar la respuesta del administrador

  idSutden: number =0;
  idCourse: number = 0;
  idConsult: number =0;

  constructor(private router: Router, private httpProvider: HttpProviderService) { 
  }

  ngOnInit(): void {
    this.getAllAppointmentComment();
  }

  async getAllAppointmentComment() {
    this.httpProvider.findCommentConsult().subscribe((data: any) => {
      if (data?.body) {
        this.appointmentComments = data.body;
      }
    }, (error: any) => {
      if (error?.status === 404) {
        console.log('Error 404: No se encontraron comentarios.');
        this.appointmentComments = [];
      }
    });
  }
  // Método para obtener los comentarios de la página actual
  get paginatedComments() {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.appointmentComments.slice(start, end);
  }

  // Método para abrir el modal con la consulta completa
  openModal(comment: any) {
    this.selectedComment = comment;
  }

  // Método para cerrar el modal
  closeModal() {
    this.selectedComment = null;
    this.response = '';
  }

  // Método para enviar la respuesta
  submitResponse() {
      if (this.response) {
      
        const commentConsultData = {
          idConsult: this.selectedComment.Id, // Asegurar que el ID de la consulta esté presente
          descriptionComment: this.response, // Respuesta del administrador
          author: this.selectedComment.studenId, // ID del administrador o usuario que responde
          dateComment: new Date().toISOString() // Fecha actual en formato ISO
        };
        console.log(commentConsultData);
        this.httpProvider.saveAppointmentComment(commentConsultData).subscribe(
          (data: any) => {
            if (data?.body?.isSuccess) {
              console.log('Comentario agregado correctamente.');
              this.response = ''; // Limpiar el campo de respuesta
              this.closeModal(); // Cerrar el modal después de enviar la respuesta
            }
          },
          (error) => {
            console.error('Error al agregar el comentario', error);
          }
        );  
    }
  }

}
