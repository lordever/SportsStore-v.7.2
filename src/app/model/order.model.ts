import {Injectable} from "@angular/core";
import {Cart} from "./cart.model";

@Injectable()
export class Order{
  public id: number;
  public name: string;
  public address: string;
  public city: string;
  public state: string;
  public zip: string;
  public country: string;
  public snippet: boolean = false;

  constructor(public cart: Cart){}

  clear(){
    let self = this;
    self.id = null;
    self.name = self.address = self.city = null;
    self.state = self.zip = self.country = null;
    self.snippet = false;
    self.cart.clear();
  }
}
