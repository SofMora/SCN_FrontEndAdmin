import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpProviderService } from '../service/course/http-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courses: any[] = [];
  form: FormGroup;
  editingCourseId: number | null = null;
  items: any[] = [];
  idProfessor: any;

  constructor(private router: Router, private httpProvider: HttpProviderService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      cycle: [''],
      description: [''],
      statusCourse: [true, Validators.required],
      idProfessor: ['']
    });
  }

  ngOnInit(): void {
    this.getAllCoursesProfe();
    this.getAllProfesors();
  }

  async getAllCourses() {
    this.httpProvider.getAllCourse().subscribe((data: any) => {
      if (data?.body) {
        this.courses = data.body;
      }
    }, (error: any) => {
      if (error?.status === 404) {
        console.log('Error 404: No se encontraron cursos.');
        this.courses = [];
      }
    });
  }
  async getAllCoursesProfe() {
    this.httpProvider.getwithprofessor().subscribe((data: any) => {
      if (data?.body) {
        this.courses = data.body;
      }
    }, (error: any) => {
      if (error?.status === 404) {
        console.log('Error 404: No se encontraron cursos.');
        this.courses = [];
      }
    });
  }
  async getAllProfesors() {
    this.httpProvider.getAllProfessors().subscribe((data: any) => {
      if (data?.body) {
        this.items = data.body;
      }
    }, (error: any) => {
      if (error?.status === 404) {
        console.log('Error 404: No se encontraron cursos.');
        this.items = [];
      }
    });
  }


  addCourse() {
    if (this.form.valid) {
      let courseData = { ...this.form.value };
      
      if (this.editingCourseId) {
        courseData.id = this.editingCourseId;
        this.httpProvider.saveCourse(courseData).subscribe((data: any) => {
          if (data?.body?.isSuccess) {
            console.log('Curso actualizado correctamente.');
            this.getAllCoursesProfe();
            this.form.reset();
          }
        }, (error) => {
          console.log('Error al actualizar curso', error);
        });
      } else {
        delete courseData.id 
        this.httpProvider.saveCourse(courseData).subscribe((data: any) => {
          if (data?.body?.isSuccess) {
            console.log('Curso agregado correctamente.');
            
          }
        }, (error) => {
          console.log('Error al agregar curso', error);
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  updateCourse(course: any) {
    this.editingCourseId = course.id;
    this.form.patchValue({
      name: course.name,
      cycle: course.cycle,
      description: course.description || '',
      statusProfessor: course.statusProfessor,
      idProfessor: course.idProfessor

    });
  }

  deleteCourse(courseId: number) {
    this.httpProvider.deleteCourseById(courseId).subscribe(async (data: any) => {
      if (data?.body?.isSuccess) {
        console.log(`Course with ID ${courseId} deleted.`);
        this.getAllCourses();
      }
    }, async (error) => {
      console.log(`Error to delete course ${courseId}`, error);
    });
  }
}