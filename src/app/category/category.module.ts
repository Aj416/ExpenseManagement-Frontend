import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { AppCategoryRoutingModule } from '../app-category-routing/app-category-routing.module';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';


@NgModule({
  declarations: [CategoryListComponent, CategoryCreateComponent, CategoryDeleteComponent, CategoryUpdateComponent],
  imports: [
    CommonModule,
    AppCategoryRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CategoryModule { }
