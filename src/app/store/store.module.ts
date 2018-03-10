import {NgModule} from "@angular/core";
import {StoreComponent} from "./store.component";
import {ModelModule} from "../model/model.module";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CounterDirective} from "./counter.directive";
import {CartSummaryComponent} from "./cartSummary.component";
import {CartDetailComponent} from "./cartDetail.component";
import {CheckoutComponent} from "./checkout.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [StoreComponent, CounterDirective, CartSummaryComponent, CartDetailComponent, CheckoutComponent],
  imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
  exports: [StoreComponent, CartDetailComponent, CheckoutComponent]
})
export class StoreModule{}
