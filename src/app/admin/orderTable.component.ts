import {Component} from "@angular/core";
import {OrderRepository} from "../model/order.repository";
import {Order} from "../model/order.model";

@Component({
  moduleId: module.id,
  selector: 'order-table',
  templateUrl: 'orderTable.component.html'
})
export class OrderTableComponent{
  includeShippet: boolean = false;

  constructor(private orderRepository: OrderRepository){}

  get orders(): Order[]{
    return this.orderRepository.getOrders();
  }

  markSnippet(order: Order){
    order.snippet = true;
    this.orderRepository.updateOrder(order);
  }

  delete(id: number){
    this.orderRepository.deleteOrder(id);
  }
}
