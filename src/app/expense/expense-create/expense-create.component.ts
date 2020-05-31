import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { CreateExpense } from 'src/app/_interfaces/createExpense.model';
import { Category } from '../../_interfaces/category.model';
import { Source } from '../../_interfaces/source.model';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.css']
})
export class ExpenseCreateComponent implements OnInit {
  public errorMessage: string = '';
  public categories: Category[];
  public expenseSources: Source[];
  public expenseForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private datePipe: DatePipe, private location: Location) { }

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      source: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
    });
    this.getAllCategory();
    this.getAllPaymentSource();
  }

  public validateControl = (controlName: string) => {
    if (this.expenseForm.controls[controlName].invalid && this.expenseForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.expenseForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public executeDatePicker = (event) => {
    this.expenseForm.patchValue({ 'date': event });
  }

  public createExpense = (expenseFormValue) => {
    if (this.expenseForm.valid) {
      this.executeExpenseCreation(expenseFormValue);
    }
  }

  private executeExpenseCreation = (expenseFormValue) => {
    const expense: CreateExpense = {
      date: this.datePipe.transform(expenseFormValue.date, 'yyyy-MM-dd'),
      categoryId: +expenseFormValue.category,
      sourceId: +expenseFormValue.source,
      amount: +expenseFormValue.amount
    }

    const apiUrl = 'api/Expenses';
    this.repository.create(apiUrl, expense)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }

  public redirectToExpenseList() {
    // this.router.navigate(['/expense/list']);
    this.location.back();
  }

  public getAllCategory = () => {
    let apiUrl: string = `api/Categories`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.categories = res as Category[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public getAllPaymentSource = () => {
    let apiUrl: string = `api/Sources`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.expenseSources = res as Source[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

}
