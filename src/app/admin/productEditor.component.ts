import {Component} from "@angular/core";
import {Product} from "../model/product.model";
import {ProductRepository} from "../model/product.repository";
import {Router, ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'product-editor',
  templateUrl: 'productEditor.component.html'
})
export class ProductEditorComponent{
  editing: boolean = false;
  product: Product = new Product();

  constructor(private productRepository: ProductRepository,
  private router: Router,
  private activatedRoute: ActivatedRoute){
    this.editing = activatedRoute.snapshot.params['mode'] == 'edit';
    if(this.editing) {
      Object.assign(this.product,
        productRepository.getProduct(activatedRoute.snapshot.params['id']));
    }
  }

  save(form: NgForm){
    this.productRepository.saveProduct(this.product);
    this.router.navigateByUrl('/admin/main/products');
  }
}
