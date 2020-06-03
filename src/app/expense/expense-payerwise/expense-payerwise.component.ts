import { Component, OnInit } from '@angular/core';
import { PayerWise } from '../../_interfaces/payerWise.model';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense-payerwise',
  templateUrl: './expense-payerwise.component.html',
  styleUrls: ['./expense-payerwise.component.css']
})
export class ExpensePayerwiseComponent implements OnInit {
  public payers: PayerWise[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getPayerWiseExpense();
  }

  private getPayerWiseExpense = () => {
    let currentDate = new Date();
    let date: string = this.activeRoute.snapshot.queryParamMap.get('date') || this.datePipe.transform(currentDate, 'yyyy-MM-dd');;
    let apiUrl: string = `api/Expenses/payer-report/${date}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.payers = res as PayerWise[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

}
