import { Observable, observable } from "rxjs";



export interface iCanDeactivate{
  CanDeactivate : () => boolean | Observable <boolean> | Promise <boolean>
} 