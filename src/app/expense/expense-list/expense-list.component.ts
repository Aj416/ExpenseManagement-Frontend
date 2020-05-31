import { Component, OnInit } from '@angular/core';
import { Expense } from '../../_interfaces/expense.model';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
  providers: [DatePipe]
})
export class ExpenseListComponent implements OnInit {
  public expenses: Expense[];
  public errorMessage: string = '';
  public sum: number = 0;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router
    ,private activeRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllExpense();
  }

  public getAllExpense = () => {
    let currentDate = new Date();
    let date: any = this.activeRoute.snapshot.queryParamMap.get('date') || this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    let apiAddress: string = `api/Expenses?date=${date}`;
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.expenses = res as Expense[];
        this.sum = this.expenses?.map(a => a.amount).reduce(function (a, b) {
          return a + b;
        });
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public getExpenseDetailsByDate = (date: Date) => {
    const detailsUrl: string = `/expense/details/${date}`;
    this.router.navigate([detailsUrl]);
  }

}
