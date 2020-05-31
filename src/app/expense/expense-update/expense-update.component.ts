import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseDetail } from '../../_interfaces/expenseDetail.model'
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { Category } from '../../_interfaces/category.model';
import { Source } from '../../_interfaces/source.model';

@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.component.html',
  styleUrls: ['./expense-update.component.css']
})
export class ExpenseUpdateComponent implements OnInit {
  public errorMessage: string = '';
  public expenseDetail: ExpenseDetail;
  public expenseForm: FormGroup;
  public categories: Category[];
  public expenseSources: Source[];

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute, private datePipe: DatePipe, private location: Location) { }

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      source: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
    });
    this.getAllCategory();
    this.getAllPaymentSource();
    this.getExpenseDetailById();
  }

  private getExpenseDetailById = () => {
    let expenseId: string = this.activeRoute.snapshot.params['id'];

    let expenseByIdUrl: string = `api/Expenses/detail/${expenseId}`;

    this.repository.getData(expenseByIdUrl)
      .subscribe(res => {
        this.expenseDetail = res as ExpenseDetail;
        this.expenseForm.patchValue(this.expenseDetail);
        this.expenseForm.patchValue({ 'category': this.expenseDetail.categoryId });
        this.expenseForm.patchValue({ 'source': this.expenseDetail.sourceId });
        $('#date').val(this.datePipe.transform(this.expenseDetail.date, 'MM/dd/yyyy'));
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
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

  public redirectToExpenseList = () => {
    this.location.back();
  }

  public updateExpense = (expenseFormValue) => {
    if (this.expenseForm.valid) {
      this.executeExpensepdate(expenseFormValue);
    }
  }

  private executeExpensepdate = (expenseFormValue) => {

    this.expenseDetail.date = this.datePipe.transform(expenseFormValue.date, 'yyyy-MM-dd');
    this.expenseDetail.categoryId = +expenseFormValue.category;
    this.expenseDetail.sourceId = +expenseFormValue.source;
    this.expenseDetail.amount = +expenseFormValue.amount;

    let apiUrl = `api/Expenses/${this.expenseDetail.expenseId}`;
    this.repository.update(apiUrl, this.expenseDetail)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
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
