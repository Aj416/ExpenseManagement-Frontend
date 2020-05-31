import { Component, OnInit } from '@angular/core';
import { Category } from '../../_interfaces/category.model';
import { RepositoryService } from '../../shared/services/repository.service'
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategory();
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

  public redirectToDeletePage = (id) => {
    const deleteUrl: string = `/category/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }

  public redirectToUpdatePage = (id) => {
    const updateUrl: string = `/category/update/${id}`;
    this.router.navigate([updateUrl]);
  }

}
