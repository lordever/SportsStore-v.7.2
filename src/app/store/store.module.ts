import {NgModule} from "@angular/core";
import {StoreComponent} from "./store.component";
import {ModelModule} from "../model/model.module";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CounterDirective} from "./counter.directive";
import {CartSummaryComponent} from "./cart.component";

@NgModule({
  declarations: [StoreComponent, CounterDirective, CartSummaryComponent],
  imports: [ModelModule, BrowserModule, FormsModule],
  exports: [StoreComponent]
})
export class StoreModule{}
