import {Component} from "@angular/core";
import {ProductRepository} from "../model/product.repository";
import {Product} from "../model/product.model";
import {Cart} from "../model/cart.model";
import {Router} from "@angular/router";

@Component({
  selector: 'store',
  moduleId: module.id,
  templateUrl: 'store.component.html'
})
export class StoreComponent{
  public selectedCategory: string = null;
  public productsPerPage = 4;
  public selectedPage = 1;

  constructor(private productRepository: ProductRepository,
              private cart: Cart,
              private router: Router){}

  get products(): Product[]{
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.productRepository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): string[]{
    return this.productRepository.getCategories();
  }

  changeCategory(selectedCategory ?: string){
    this.selectedCategory = selectedCategory;
  }

  changePage(pageNumber: number){
    this.selectedPage = pageNumber;
  }

  changePageSize(newSize: number){
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number[]{
    return Array(Math.ceil(this.productRepository
        .getProducts().length / this.productsPerPage));
  }

  public addProductToCart(product: Product){
    this.cart.addLine(product);
    this.router.navigateByUrl('/cart');
  }
}
