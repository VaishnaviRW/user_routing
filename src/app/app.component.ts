import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isloginstatus:boolean=false
  title = 'user-management';

  private _authservice =inject(AuthService)
  ngOnInit(): void {

  

  }
}
