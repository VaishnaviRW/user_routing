import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  
})
export class NavbarComponent implements OnInit {
 
  constructor(private _authservice : AuthService,
    private _router :Router,
    private _routes :ActivatedRoute
  ) { }

  ngOnInit(): void {

   
  }

  logout(){
    this._authservice.logoutstatus()
     this._router.navigate(['/'])
  }

}
