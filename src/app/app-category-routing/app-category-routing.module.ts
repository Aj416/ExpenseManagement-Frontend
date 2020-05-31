import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from '../category/category-list/category-list.component';
import { CategoryCreateComponent } from '../category/category-create/category-create.component';
import { CategoryDeleteComponent } from '../category/category-delete/category-delete.component';
import { CategoryUpdateComponent } from '../category/category-update/category-update.component';

const routes: Routes = [
  { path: 'list', component: CategoryListComponent },
  { path: 'create', component: CategoryCreateComponent },
  { path: 'delete/:id', component: CategoryDeleteComponent },
  { path: 'update/:id', component: CategoryUpdateComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppCategoryRoutingModule { }
