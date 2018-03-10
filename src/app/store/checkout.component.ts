import { Component } from "@angular/core";
import {Order} from "../model/order.model";
import {OrderRepository} from "../model/order.repository";
import {NgForm} from "@angular/forms";

@Component({
  moduleId: module.id,
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.css']
})
export class CheckoutComponent {
  orderSent: boolean = false;
  submitted: boolean = false;

  constructor(private orderRepository: OrderRepository,
                private order: Order){}


  submitForm(form: NgForm){
    this.submitted = true;
    if(form.valid){
      this.orderRepository.saveOrder(this.order).subscribe(order => {
        this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      });
    }
  }
}
