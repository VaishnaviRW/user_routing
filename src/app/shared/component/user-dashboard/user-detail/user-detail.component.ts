
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { Iuser } from 'src/app/shared/model/user';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user.service';
import { GetconfirmComponent } from '../../getconfirm/getconfirm.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  userId = '';
  userDetail!: Iuser;
  userArr: Iuser[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private _routes: ActivatedRoute,
    private _userservice: UserService,
    private _router: Router,
    private _snackbar: SnackbarService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._routes.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {

        const id = params.get('id');

        if (id) {
          this.userId = id;
          this.loadUser(id);
        }
      });
  }

  private loadUser(id: string): void {

    this._userservice.FetchuserById(id).subscribe({
      next: user => {

        this.userDetail = user;

        if (!user) {
          this.userArr = [];
          return;
        }

        this._userservice.fetchuser().subscribe({
          next: users => this.userArr = users,
          error: err => console.error(err)
        });
      },
      error: err => {
        this.userArr = [];
        console.error(err);
      }
    });
  }

  onedit(): void {
    this._router.navigate(['/user', this.userId, 'edit'], {
      queryParamsHandling: 'preserve'
    });
  }

 
  onremove(id: string): void {

    const dialogRef = this._dialog.open(GetconfirmComponent, {
      width: '350px',
      disableClose: true,
      data: {
        message: 'Are you sure you want to delete this user?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.deleteUser(id);
      }

    });
  }

  private deleteUser(id: string): void {

    this._userservice.removeuser(id).subscribe({
      next: data => {

        this._snackbar.opensnackbar(data.msg);

        this.userArr = this.userArr.filter(
          user => user.userId !== id
        );

        if (this.userArr.length > 0) {

          this._router.navigate(
            ['/user', this.userArr[0].userId],
            {
              queryParams: {
                cr: this.userArr[0].userRole
              }
            }
          );

        } else {

          this.userDetail = undefined as any;
          this._router.navigate(['/user']);

        }
      },

      error: err => console.error('Delete User Error:', err)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
