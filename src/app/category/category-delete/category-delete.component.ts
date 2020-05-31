import { Component, OnInit } from '@angular/core';
import { Category } from '../../_interfaces/category.model';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public category: Category;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getCategoryById();
  }

  private getCategoryById = () => {
    let categoryId: string = this.activeRoute.snapshot.params['id'];

    let apiUrl: string = `api/Categories/${categoryId}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.category = res as Category;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public redirectToCategoryList = () => {
    this.location.back();
  }

  public deleteCategory = () => {
    const deleteUrl: string = `api/Categories/${this.category.id}`;
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
