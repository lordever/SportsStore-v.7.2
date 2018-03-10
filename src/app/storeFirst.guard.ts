import {Injectable} from "@angular/core";
import {Router, ActivatedRouteSnapshot} from "@angular/router";
import {StoreComponent} from "./store/store.component";

@Injectable()
export class StoreFirstGuard{
  private firstNavigate = true;

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot): boolean{
    if(this.firstNavigate){
      this.firstNavigate = false;
      if(route.component !== StoreComponent){
        this.router.navigateByUrl("/");
        return false;
      }
    }
    return true;
  }
}
