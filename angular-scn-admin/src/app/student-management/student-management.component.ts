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
    this.getPendingStudents();
  }

  async getPendingStudents() {
    this.httpProvider.getPendingStudents().subscribe((data: any) => {
      if (data?.body) {
        this.students = data.body;
      }
    }, (error: any) => {
      if (error?.status === 404) {
        console.log('Error 404: No se encontraron estudiantes.');
        this.students = [];
      }
    });
  }


  acceptStudent(studentId: number) {
    this.httpProvider.approvalStudent(studentId).subscribe(async (data: any) => {
      if (data?.body?.isSuccess) {
        console.log(`Student with ID ${studentId} approved.`);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      }
    }, async (error) => {
      console.log(`Error approving student ${studentId}`, error);
      setTimeout(() => {
        this.router.navigate(['/Home']);
      }, 500);
    });
  }

  rejectStudent(studentId: number) {
    this.httpProvider.denegateStudent(studentId).subscribe(async (data: any) => {
      if (data?.body?.isSuccess) {
        console.log(`Student with ID ${studentId} rejected.`);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      }
    }, async (error) => {
      console.log(`Error rejecting student ${studentId}`, error);
      setTimeout(() => {
        this.router.navigate(['/Home']);
      }, 500);
    });
  }
}

