import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  public homeText: string;

  constructor( private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.homeText = "WELCOME TO EXPENSE MANAGEMENT APPLICATION";
  }

  public executeDatePicker = (event) => {
    const listUrl: string = `/expense/list`;
    this.router.navigate([listUrl], { queryParams: { date: this.datePipe.transform(event, 'yyyy-MM-dd') }});
  }

}
