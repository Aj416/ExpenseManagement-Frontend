import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseListComponent } from '../expense/expense-list/expense-list.component';
import { ExpenseDetailsComponent } from '../expense/expense-details/expense-details.component';
import { ExpenseCreateComponent } from '../expense/expense-create/expense-create.component';
import { ExpenseUpdateComponent } from '../expense/expense-update/expense-update.component'
import { ExpenseDeleteComponent } from '../expense/expense-delete/expense-delete.component'

const routes: Routes = [
  { path: 'list', component: ExpenseListComponent },
  { path: 'details/:date', component: ExpenseDetailsComponent },
  { path: 'create', component: ExpenseCreateComponent },
  { path: 'update/:id', component: ExpenseUpdateComponent },
  { path: 'delete/:id', component: ExpenseDeleteComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppExpenseRoutingModule { }
