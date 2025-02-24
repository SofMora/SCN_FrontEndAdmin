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
  update:string = 'N'

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
  id:number = 0;


  constructor(private router: Router, private httpProvider: HttpProviderService) { }


  ngOnInit(): void {
    this.loadNews();
  }

  editNews(news: any) {
    this.selectedNews = news;
    this.newsForm.patchValue({
      title: news.title,
      content: news.textNews,
    });
    this.id= news.id
    this.update = 'S';
  }

  deleteNews(id: number) {
    this.httpProvider.deleteNewsById(id).subscribe(() => {
      this.loadNews();
    }, (error) => {
      console.error('Error deleting news:', error);
    });
  }

  saveNews() {

    console.log(this.update);
    console.log(this.id);
    if(this.update == 'N')
    {
      const newsData = {
        title: this.newsForm.get("title")?.value,
        author: this.author.toString(),
        textNews: this.newsForm.get("content")?.value,
        dateNews: this.dateNews,
        typeNews: this.typeNews.toString(),
        image: null as string | null // Aquí guardaremos la imagen en Base64
      };
    
      if (this.image) {
        const reader = new FileReader();
        reader.readAsDataURL(this.image); // Convertir a Base64
        reader.onload = () => {
          newsData.image = newsData.image = reader.result as string; // La imagen en Base64
          this.enviarNoticia(newsData);
          
        };
      } else {
        this.enviarNoticia(newsData);
      }
    } else{

      const newsData = {
        id: this.id,
        title: this.newsForm.get("title")?.value,
        author: null,
        textNews: this.newsForm.get("content")?.value,
        dateNews: null,
        typeNews: null,
        image: null as string | null // Aquí guardaremos la imagen en Base64
      };
    
      if (this.image) {
        const reader = new FileReader();
        reader.readAsDataURL(this.image); // Convertir a Base64
        reader.onload = () => {
          newsData.image = newsData.image = reader.result as string; // La imagen en Base64
          this.updateNews(newsData);
          
        };
      } else {
        this.updateNews(newsData);
      }

    }

    
  }
  
  enviarNoticia(newsData: any) {
    this.httpProvider.saveNews(newsData).subscribe(
      (data: any) => {
        console.log("Respuesta del servidor:", data);
        if (data?.isSuccess) {
          console.log('Noticia agregada correctamente.');
          this.loadNews();
        }
      },
      (error) => {
        console.error('Error al agregar la noticia', error);
      }
    );
  }

  updateNews(newsData: any){
    this.httpProvider.updateNews(newsData).subscribe(
      (data: any) => {
        console.log("Respuesta del servidor:", data);
        if (data?.isSuccess) {
          console.log('Noticia actualizada correctamente.');
          this.loadNews();
        }
      },
      (error) => {
        console.error('Error al actualizar la noticia', error);
      }
    );
  }

  async loadNews() {
    this.httpProvider.getAllNews().subscribe(
      (data) => {
        console.log(data);
        this.newsList = data.body; // Asegúrate de asignar el array
        console.log('Noticias obtenidas:', this.newsList);
      },
      (error) => {
        console.error('Error al cargar noticias:', error);
      }
    );
  }


  onImageUpload(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

 



}
