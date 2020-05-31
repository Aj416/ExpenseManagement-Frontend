import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { InternalServerComponent } from '../error-pages/internal-server/internal-server.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'expense', loadChildren: () => import('./../expense/expense.module').then(m => m.ExpenseModule) },
  { path: 'category', loadChildren: () => import('./../category/category.module').then(m => m.CategoryModule) },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
