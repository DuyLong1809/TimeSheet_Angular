import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './modules/auth/auth-login/auth-login.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { LogoutGuard } from './modules/layout/sidebar/auth/logout.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/home/admin/task',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: AuthLoginComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'app/home',
    component: HomeComponent,
    canActivate: [LogoutGuard],
    
    children: [
      {
        path: 'admin/task',
        loadChildren: () => import('./modules/ts-task/ts-task.module').then((m) => m.TsTaskModule),
      },

      {
        path: 'project',
        loadChildren: () => import('./modules/ts-project/ts-project.module').then((m) => m.TsProjectModule),
      },
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
