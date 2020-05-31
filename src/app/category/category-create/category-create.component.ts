import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Location } from '@angular/common';
import { CreateCategory } from 'src/app/_interfaces/createCategory.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  public errorMessage: string = '';
  public categoryForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private location: Location) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
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

  public createCategory = (categoryFormValue) => {
    if (this.categoryForm.valid) {
      this.executeCategoryCreation(categoryFormValue);
    }
  }

  private executeCategoryCreation = (categoryFormValue) => {
    const category: CreateCategory = {
      category: categoryFormValue.category,
      description: categoryFormValue.description,
    }

    const apiUrl = 'api/Categories';
    this.repository.create(apiUrl, category)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }

  public redirectToCategoryList() {
    this.location.back();
  }

}
