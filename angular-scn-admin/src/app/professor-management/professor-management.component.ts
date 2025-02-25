import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpProviderService } from '../service/professor/http-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-management',
  standalone: true,
  imports: [ NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './professor-management.component.html',
  styleUrls: ['./professor-management.component.css']
})
export class ProfessorManagementComponent implements OnInit {

  professors: any[] = [];
  form: FormGroup;
  editingProfessorId: number | null = null;

  constructor(private router: Router, private httpProvider: HttpProviderService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      description: [''],
      photo: [''],
      socialLink: [''],
      statusProfessor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllProfessors();
  }

  async getAllProfessors() {
    this.httpProvider.getAllProfessor().subscribe((data: any) => {
      if (data?.body) {
        this.professors = data.body;
      }
    }, (error: any) => {
      if (error?.status === 404) {
        console.log('Error 404: No se encontraron profesores.');
        this.professors = [];
      }
    });
  }

  addProfessor() {
    if (this.form.valid) {
      let professorData = { ...this.form.value };
  
      if (this.editingProfessorId) {
        
           // Si tiene ID, estamos en modo actualización
      professorData.id = this.editingProfessorId;
        this.httpProvider.updateProfessor(professorData).subscribe((data: any) => {
          if (data?.body?.isSuccess) {
            console.log('Profesor actualizado correctamente.');
            this.getAllProfessors();
            this.form.reset();
          }
        }, (error) => {
          console.log('Error al actualizar profesor', error);
        });
      } else {
        // Asignar un valor específico al ID
        delete professorData.id;
        // Si no tiene ID, se está creando un nuevo profesor
        this.httpProvider.saveProfessor(professorData).subscribe((data: any) => {
          if (data?.body?.isSuccess) {
            console.log('Profesor agregado correctamente.');
            this.getAllProfessors();
            this.form.reset();
          }
        }, (error) => {
          console.log('Error al agregar profesor', error);
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }
  
  updateProfessor(professor: any) {
    this.editingProfessorId = professor.id;
    this.form.patchValue({
      name: professor.name,
      lastName: professor.lastName,
      email: professor.email,
      username: professor.username,
      password: '', // No se debe prellenar por seguridad
      description: professor.description || '',
      photo: '', // No se puede establecer un archivo directamente en el formulario
      socialLink: professor.socialLink || '',
      statusProfessor: professor.statusProfessor
    });
  }

  deleteProfessor(professorId: number) {
    this.httpProvider.deleteProfessorById(professorId).subscribe(async (data: any) => {
      if (data?.body?.isSuccess) {
        console.log(`Student with ID ${professorId} rejected.`);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      }
    }, async (error) => {
      console.log(`Error rejecting student ${professorId}`, error);
      setTimeout(() => {
        this.router.navigate(['/Home']);
      }, 500);
    });
  }
}
