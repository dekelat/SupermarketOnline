import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  public categories: Category[];

  constructor(private categoriesService: CategoriesService,
    public productsService: ProductsService) { }

  ngOnInit(): void {
    let observable = this.categoriesService.getCategories();

    observable.subscribe(categories => {
      this.categories = categories;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " +
        serverErrorResponse.error.error);
    });
  }

  public onSaveProduct(form: NgForm) {
    if(this.productsService.selectedProduct.id) {
      this.updateProduct(this.productsService.selectedProduct, form);
    }
    else {
      this.addProduct(this.productsService.selectedProduct, form);
    }
  }

  private updateProduct(product: Product, form: NgForm) {
    let observable = this.productsService.updateProduct();
    observable.subscribe(() => {
      // Update UI
      this.productsService.products.forEach((currentProduct, index) => {
        if(currentProduct.id === product.id) {
          
          // If category wasn't changed replace the product. 
          // If it was, remove it.
          if(currentProduct.categoryId === product.categoryId) {
            this.productsService.products.splice(index, 1, product);
          }
          else {
            this.productsService.products.splice(index, 1);
          }
          return;
        }
      });

      // Init form
      this.initForm(form);

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " +
        serverErrorResponse.error.error);
    });
  }

  private addProduct(product: Product, form: NgForm) {
    let observable = this.productsService.addProduct();
    observable.subscribe(newProductId => {
      // Update UI
      if(product.categoryId === this.categoriesService.currentCategoryId) {
        product.id = newProductId;
        this.productsService.products.push(product);
      }

      // Init form
      this.initForm(form);

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " +
        serverErrorResponse.error.error);
    });
  }

  private initForm(form: NgForm) {
    this.productsService.selectedProduct = new Product();
    form.resetForm();
  }
}
