import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public categories: Category[];
  public products: Product[];
  public selectedProduct: Product;

  constructor(private categoriesService: CategoriesService, 
    private productsService: ProductsService) {
      this.categories = [];
      this.products = [];
      this.selectedProduct = new Product();
    }

  ngOnInit(): void {
    let observable = this.categoriesService.getCategories();

    observable.subscribe(categories => {
      this.categories = categories;

      // Init products with the first category
      this.getProducts(this.categories[0].id);

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  public getProducts(categoryId) {
    let observable = this.productsService.getProducts(categoryId);

    observable.subscribe(products => {
      this.products = products;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  public showProduct(product) {
    this.selectedProduct = product;
  }

  public addToCart(){}

}
