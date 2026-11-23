import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { iCanDeactivate } from "../../model/cand";
import { Observable } from "rxjs";





@Injectable({
    providedIn:'root'
})



export class candactivateguard implements CanDeactivate <iCanDeactivate>{
    canDeactivate(component: iCanDeactivate,
         currentRoute: ActivatedRouteSnapshot,
          currentState: RouterStateSnapshot,
           nextState?: RouterStateSnapshot):
            Observable<boolean | UrlTree> |
             Promise<boolean | UrlTree> | boolean | UrlTree {
                return component.CanDeactivate()
    }

}