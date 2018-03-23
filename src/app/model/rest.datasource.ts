import {Injectable} from "@angular/core";
import {Http, RequestMethod, Request} from "@angular/http";
import {Observable} from "rxjs";
import {Product} from "./product.model";
import {Order} from "./order.model";

const PROTOCOL = 'http';
const PORT = '3500';

@Injectable()
export class RestDataSource{
  baseUrl: string;
  authToken: string;

  constructor(private http: Http) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts(): Observable<Product[]> {
    return this.sendRequest(RequestMethod.Get, 'products');
  }

  saveProduct(product: Product): Observable<Product>{
    return this.sendRequest(RequestMethod.Post, "products",
      product, true);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.sendRequest(RequestMethod.Put, `products/${product.id}`,
      product, true);
  }

  deleteProduct(id: number): Observable<Product>{
    return this.sendRequest(RequestMethod.Delete, `products/${id}`,
      null, true);
  }

  getOrders(): Observable<Order[]>{
    return this.sendRequest(RequestMethod.Get, 'orders',
      null, true);
  }

  deleteOrder(id: number): Observable<Order>{
    return this.sendRequest(RequestMethod.Delete, `orders/${id}`,
      null, true);
  }

  updateOrder(order: Order): Observable<Order>{
    return this.sendRequest(RequestMethod.Put, `orders/${order.id}`,
      order, true);
  }

  saveOrder(order: Order): Observable<Order>{
    return this.sendRequest(RequestMethod.Post, 'orders', order);
  }

  authenticate(user: string, pass: string): Observable<boolean>{
    return this.http.request(new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + 'login',
      body: {name: user, password: pass}
    })).map(response => {
      const result = response.json();
      this.authToken = result.success ? result.token : null;
      return result.success;
    });
  }

  private sendRequest(verb: RequestMethod,
                      url: string,
                      body?: Product | Order,
                      auth: boolean = false): Observable<Product | Product[] | Order | Order[]> {
    const request = new Request({
      method: verb,
      url: this.baseUrl + url,
      body: body
    });
    if (auth && this.authToken !== null) {
      request.headers.set('Authorization', `Bearer<${this.authToken}>`);
    }
    return this.http.request(request).map(response => response.json());
  }
}
