import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HttpProviderService } from '../service/comment/http-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-management',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './comment-management.component.html',
  styleUrl: './comment-management.component.css'
})
export class CommentManagementComponent {

  comments: any[] = [];

  constructor(private router: Router, private httpProvider: HttpProviderService) {}

  ngOnInit(): void {
    this.getAllComments();
  }

  async getAllComments() {
    this.httpProvider.getAllComment().subscribe((data: any) => {
      if (data?.body) {
        this.comments = data.body;
      }
    }, (error: any) => {
      if (error?.status === 404) {
        console.log('Error 404: No se encontraron comentarios.');
        this.comments = [];
      }
    });
  }

  deleteComment(commentId: number) {
    this.httpProvider.deleteCommentById(commentId).subscribe(async (data: any) => {
      if (data?.body?.isSuccess) {
        console.log(`Comment with ID ${commentId} rejected.`);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      }
    }, async (error) => {
      console.log(`Error rejecting comment ${commentId}`, error);
      setTimeout(() => {
        this.router.navigate(['/comment']);
      }, 500);
    });
  }
}
