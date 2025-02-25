import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
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
    {
      path: 'questionsAnswers',
      loadComponent: () =>
        import('./questions-answers-management/questions-answers-management.component').then(
          (m) => m.QuestionsAnswersManagementComponent
        ),
    },
    {
      path: 'login',
      loadComponent: () =>
        import('./login/login.component').then(
          (m) => m.LoginComponent
        ),
    },
    { path: '**', redirectTo: 'home' },
];
