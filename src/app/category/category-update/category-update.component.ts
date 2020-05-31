import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../_interfaces/category.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})

export class CategoryUpdateComponent implements OnInit {
  public errorMessage: string = '';
  public category: Category;
  public categoryForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.getCategoryById();
  }

  private getCategoryById = () => {
    let categoryId: string = this.activeRoute.snapshot.params['id'];

    let apiUrl: string = `api/Categories/${categoryId}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.category = res as Category;
        this.categoryForm.patchValue(this.category);
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public validateControl = (controlName: string) => {
    if (this.categoryForm.controls[controlName].invalid && this.categoryForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.categoryForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public redirectToCategoryList = () => {
    this.location.back();
  }

  public updateCategory = (categoryFormValue) => {
    if (this.categoryForm.valid) {
      this.executeCategoryUpdate(categoryFormValue);
    }
  }

  private executeCategoryUpdate = (categoryFormValue) => {
    this.category.category = categoryFormValue.category;
    this.category.description = categoryFormValue.description;

    let apiUrl = `api/Categories/${this.category.id}`;
    this.repository.update(apiUrl, this.category)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }

}
