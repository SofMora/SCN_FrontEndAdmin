import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpProviderService } from '../service/student/http-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit {

  students: any[] = [];

  constructor(private router: Router, private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  async getAllStudents() {
    this.httpProvider.getAllStudents().subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.students = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            console.log(`error`);
            if(error.error && error.error.message){
              this.students = [];
            }
          }
        }
      });
  }

 
  acceptStudent(id: number): void {
    console.log(`Accepted student with ID: ${id}`);
    // Aquí podrías llamar a una API para actualizar el estado del estudiante
  }

  rejectStudent(id: number): void {
    console.log(`Rejected student with ID: ${id}`);
    // Aquí podrías llamar a una API para actualizar el estado del estudiante
  }
}

