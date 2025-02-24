import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpProviderService } from '../service/news/http-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-management',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './news-management.component.html',
  styleUrl: './news-management.component.css'
})
export class NewsManagementComponent implements OnInit {

  newsList: any[] = [];

  selectedNews: any = null;

  newsForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    image: new FormControl(null),
    file: new FormControl(null)
  });

  title:string ='';
  author:number = 1;
  textNews:string = '';
  dateNews = new Date().toISOString();
  image: File | null=null;
  typeNews:number = 1;


  constructor(private router: Router, private httpProvider: HttpProviderService) { }


  ngOnInit(): void {
    throw new Error('Method not implemented.');


  }

  editNews(news: any) {
    this.selectedNews = news;
    this.newsForm.patchValue({
      title: news.title,
      content: news.content
    });
  }

  deleteNews(id: number) {
    this.httpProvider.deleteNewsById(id).subscribe(() => {
      this.newsList = this.newsList.filter(n => n.id !== id);
    }, (error) => {
      console.error('Error deleting news:', error);
    });
  }

  saveNews() { 
    const formData = new FormData();
    formData.append('title',this.newsForm.get("title")?.value);
    formData.append('author',this.author.toString());
    formData.append('textNews', this.newsForm.get("content")?.value);
    formData.append('dateNews',this.dateNews);
    formData.append('typeNews',this.typeNews.toString());


    if(this.image){
      formData.append("image", this.image);
    }

    console.log(formData);
    this.httpProvider.saveNews(formData).subscribe(
      (data: any) => {
        if (data?.body?.isSuccess) {
          console.log('Noticia agregado correctamente.');
          
        }
      },
      (error) => {
        console.error('Error al agregar la noticia', error);
      }
    );  

  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
      if (file) {
        this.image = file;
      }
  }

 



}
