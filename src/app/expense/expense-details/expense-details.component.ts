import { Component, OnInit } from '@angular/core';
import { ExpenseDetail } from '../../_interfaces/expenseDetail.model';
import { Category } from '../../_interfaces/category.model';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Source } from '../../_interfaces/source.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit {
  public expenseDetails: ExpenseDetail[];
  public categories: Category[];
  public expenseSources: Source[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllPaymentSource();
    this.getExpenseDetailsByDate();
  }

  public getExpenseDetailsByDate = () => {
    let date: Date = this.activeRoute.snapshot.params['date'];
    let apiUrl: string = `api/Expenses/list/${date}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.expenseDetails = res as ExpenseDetail[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
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

  public redirectBack() {
    this.location.back();
  }

  public redirectToUpdatePage = (id) => {
    const updateUrl: string = `/expense/update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/expense/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }

}
