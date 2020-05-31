import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AppExpenseRoutingModule } from '../app-expense-routing/app-expense-routing.module';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseUpdateComponent } from './expense-update/expense-update.component';
import { ExpenseDeleteComponent } from './expense-delete/expense-delete.component';


@NgModule({
  declarations: [
    ExpenseListComponent,
    ExpenseDetailsComponent,
    ExpenseCreateComponent,
    ExpenseUpdateComponent,
    ExpenseDeleteComponent,
  ],
  imports: [
    CommonModule,
    AppExpenseRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ExpenseModule { }
