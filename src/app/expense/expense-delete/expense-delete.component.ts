import { Component, OnInit } from '@angular/core';
import { ExpenseDetail } from '../../_interfaces/expenseDetail.model';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../_interfaces/category.model';
import { Source } from '../../_interfaces/source.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-expense-delete',
  templateUrl: './expense-delete.component.html',
  styleUrls: ['./expense-delete.component.css']
})
export class ExpenseDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public expenseDetail: ExpenseDetail;
  public categories: Category[];
  public expenseSources: Source[];

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getExpenseDetailById();
    this.getAllCategory();
    this.getAllPaymentSource();
  }

  private getExpenseDetailById = () => {
    let expenseId: string = this.activeRoute.snapshot.params['id'];

    let expenseByIdUrl: string = `api/Expenses/detail/${expenseId}`;

    this.repository.getData(expenseByIdUrl)
      .subscribe(res => {
        this.expenseDetail = res as ExpenseDetail;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  private getAllCategory = () => {
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

  private getAllPaymentSource = () => {
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

  public redirectToExpenseList = () => {
    this.location.back();
  }

  public deleteOwner = () => {
    const deleteUrl: string = `api/ExpenseDetails/${this.expenseDetail.expenseDetailId}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

}
