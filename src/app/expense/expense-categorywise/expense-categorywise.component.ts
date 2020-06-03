import { Component, OnInit } from '@angular/core';
import { CategoryWise } from 'src/app/_interfaces/categoryWise.model';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-categorywise',
  templateUrl: './expense-categorywise.component.html',
  styleUrls: ['./expense-categorywise.component.css']
})
export class ExpenseCategorywiseComponent implements OnInit {
  public categoryWise: CategoryWise[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, 
    private activeRoute: ActivatedRoute, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getCategoryWiseExpense();
  }

  private getCategoryWiseExpense = () => {
    let currentDate = new Date();
    let date: string = this.activeRoute.snapshot.queryParamMap.get('date') || this.datePipe.transform(currentDate, 'yyyy-MM-dd');;
    let apiUrl: string = `api/Expenses/category-report/${date}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.categoryWise = res as CategoryWise[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

}
