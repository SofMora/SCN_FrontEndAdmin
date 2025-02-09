import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
      path: 'home',
      loadComponent: () =>
        import('./home/home.component').then((m) => m.HomeComponent),
    },
    {
      path: 'student',
      loadComponent: () =>
        import('./student-management/student-management.component').then(
          (m) => m.StudentManagementComponent
        ),
    },
    {
      path: 'professor',
      loadComponent: () =>
        import('./professor-management/professor-management.component').then(
          (m) => m.ProfessorManagementComponent
        ),
    },
    {
      path: 'course',
      loadComponent: () =>
        import('./course-management/course-management.component').then(
          (m) => m.CourseManagementComponent
        ),
    },
    {
      path: 'news',
      loadComponent: () =>
        import('./news-management/news-management.component').then(
          (m) => m.NewsManagementComponent
        ),
    },
    {
      path: 'comment',
      loadComponent: () =>
        import('./comment-management/comment-management.component').then(
          (m) => m.CommentManagementComponent
        ),
    },
    { path: '**', redirectTo: 'home' },
];
