
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-professor-management',
  imports: [FormsModule],
  templateUrl: './professor-management.component.html',
  styleUrl: './professor-management.component.css'
})
export class ProfessorManagementComponent {

  newProfessor = { name: '', email: '' }; 

  addProfessor(): void {
    if (this.newProfessor.name && this.newProfessor.email) {
      console.log('New Professor:', this.newProfessor);
      alert(`Professor Added: ${this.newProfessor.name} (${this.newProfessor.email})`);
      this.newProfessor = { name: '', email: '' }; 
    } else {
      alert('Please fill in all fields.');
    }
  }
}
