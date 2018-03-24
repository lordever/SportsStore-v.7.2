import {Injectable} from "@angular/core";
import {Order} from "./order.model";
import {StaticDataSource} from "./static.datasource";
import {Observable} from "rxjs";
import {RestDataSource} from "./rest.datasource";

@Injectable()
export class OrderRepository{
  private orders: Order[];
  private loaded: boolean;

  constructor(private dataSource: RestDataSource){}

  getOrders(): Order[]{
    if(!this.loaded){
      this.loadOrders();
    }
    return this.orders;
  }

  saveOrder(order): Observable<Order>{
    return this.dataSource.saveOrder(order);
  }

  loadOrders(){
    this.loaded = true;
    this.dataSource.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  updateOrder(order: Order){
    this.dataSource.updateOrder(order)
      .subscribe(() => {
        this.orders.splice(this.orders.findIndex(o => o.id === order.id), 1, order);
      })
  }

  deleteOrder(id: number){
    this.dataSource.deleteOrder(id)
      .subscribe(() => {
        this.orders.splice(this.orders.findIndex(o => o.id === id), 1);
      });
  }
}
