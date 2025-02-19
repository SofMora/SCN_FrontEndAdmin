import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  sections = [
    {
      title: 'Student Management',
      description: 'Manage student records, view and approve or reject student details.',
      path: 'student'
    },
    {
      title: 'Professor Management',
      description: 'Add, update, and manage professor details in the system.',
      path: 'professor'
    },
    {
      title: 'Course Management',
      description: 'Manage courses, schedules, and enrollments.',
      path: 'course'
    },
    {
      title: 'News Management',
      description: 'Post and manage news and announcements.',
      path: 'news'
    },
    {
      title: 'Comments',
      description: 'Review and moderate user comments.',
      path: 'comment'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
