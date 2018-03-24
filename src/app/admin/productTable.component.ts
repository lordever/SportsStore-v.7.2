import {Component} from "@angular/core";
import {Product} from "../model/product.model";
import {ProductRepository} from "../model/product.repository";

@Component({
  moduleId: module.id,
  selector: 'product-table',
  templateUrl: 'productTable.component.html'
})
export class ProductTableComponent{

  constructor(private productRepository: ProductRepository){}

  get products(): Product[]{
    return this.productRepository.getProducts();
  }

  deleteProduct(id: number){
    this.productRepository.deleteProduct(id);
  }
}
