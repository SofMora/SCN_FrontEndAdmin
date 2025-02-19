import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-news-management',
  imports: [NgFor],
  templateUrl: './news-management.component.html',
  styleUrl: './news-management.component.css'
})
export class NewsManagementComponent {

   newsList = [
    { id: 1, subject: 'Breaking News', description: 'This is a breaking news update.' },
    { id: 2, subject: 'Sports Update', description: 'The local team won the match.' },
    { id: 3, subject: 'Weather Alert', description: 'Heavy rain expected tomorrow.' }
  ];

  authorizeNews(id: number): void {
    alert(`News with ID ${id} has been authorized.`);
    console.log(`Authorized news with ID: ${id}`);
  }

  rejectNews(id: number): void {
    alert(`News with ID ${id} has been rejected.`);
    console.log(`Rejected news with ID: ${id}`);
  }
}
