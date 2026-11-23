import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userArr: Iuser[] = [];

  constructor(
    private _userservice: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.fetchuser();
  }

  fetchuser(): void {
    this._userservice.fetchuser().subscribe({
      next: (data: Iuser[]) => {
        this.userArr = data || [];
        // Open the first user's detail automatically when the list is loaded.
        if (this.userArr.length > 0) {
          const currentId = this._router.url.split('?')[0].split('/')[2];
          const currentUserExists = this.userArr.some(user => user.userId === currentId);
          if (!currentUserExists && currentId !== 'adduser') {
            this._router.navigate(['/user', this.userArr[0].userId]);
          }
        }
      },
      error: err => console.error('Fetch User Error:', err)
    });
  }
}
