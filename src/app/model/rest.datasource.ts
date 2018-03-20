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

  constructor(private http: Http){
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts(): Observable<Product>{
    return this.sendRequest(RequestMethod.Get, "products");
  }

  saveOrder(order: Order): Observable<Order>{
    return this.sendRequest(RequestMethod.Post, "orders", order);
  }

  authenticate(user: string, pass: string): Observable<boolean>{
    return this.http.request(new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + 'login',
      body: {name: user, password: pass}
    })).map(response => {
      let r = response.json();
      this.authToken = r.success ? r.token : null;
      return r.success;
    })
  }

  private sendRequest(verb: RequestMethod,
                      url: string, body?: Product | Order, auth: boolean = false)
  : Observable<Product | Product[] | Order | Order[]> {
    let request = new Request({
      method: verb,
      url: this.baseUrl + url,
      body: body
    });
    if (auth && this.authToken != null) {
      request.headers.set("Authorization", `Bearer<${this.authToken}>`);
    }
    return this.http.request(request).map(response => response.json());
  }
}
