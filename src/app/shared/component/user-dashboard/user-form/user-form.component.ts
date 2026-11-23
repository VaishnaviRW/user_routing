
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { iCanDeactivate } from 'src/app/shared/model/cand';
import { Iuser } from 'src/app/shared/model/user';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, iCanDeactivate {

  userform!: FormGroup;
  userdetailformdata!: Iuser;
  userId!: string;
  isineditmode = false;
  cr: any;

  constructor(
    private _routes: ActivatedRoute,
    private _router: Router,
    private _userservice: UserService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.patchvalue();

    
    this._routes.queryParams.subscribe(res => {
      this.cr = res['cr'];
    });
  }

  // Create User Form
  createform(): void {
    this.userform = new FormGroup({
      userName: new FormControl('', Validators.required),
      userRole: new FormControl('buyer', Validators.required),
      profileDescription: new FormControl(''),
      profileImage: new FormControl(
        'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      ),
      experienceYears: new FormControl('', Validators.required),
      isActive: new FormControl(true)
    });
  }

  // Form Controls Getter
  get formcotrol() {
    return this.userform.controls;
  }

  // Patch User Data for Edit
  patchvalue(): void {

    this._routes.params.subscribe((param: Params) => {

      this.userId = param['id'];

      if (!this.userId) {
        this.isineditmode = false;
        return;
      }

      this.isineditmode = true;

      this._userservice.FetchuserById(this.userId).subscribe({

        next: (data) => {

          if (!data) {
            return;
          }

          this.userdetailformdata = data;

          this.userform.patchValue({
            userName: data.userName,
            userRole: data.userRole,
            profileDescription: data.profileDescription,
            profileImage: data.profileImage,
            experienceYears: data.experienceYears,
            isActive: data.isActive
          });

          // Ensure form remains editable
          this.userform.enable();

          // Reset dirty state after patching
          this.userform.markAsPristine();

        },

        error: (err) => {
          console.error('Fetch User Error:', err);
        }

      });

    });

  }

  // Update User
  onupdate(): void {

    if (this.userform.invalid) {
      this.userform.markAllAsTouched();
      return;
    }

    const updatedUser: Iuser = {
      ...this.userform.getRawValue(),
      userId: this.userId
    };

    this._userservice.userupdate(updatedUser).subscribe({

      next: (data) => {

        this._snackbar.opensnackbar(data.msg);

        this.isineditmode = false;

        this._router.navigate(
          ['/user', this.userId],
          {
            queryParams: {
              cr: data.data.userRole
            }
          }
        );

      },

      error: (err) => {
        console.error('Update User Error:', err);
      }

    });

  }

  // Add / Update Submit
  usersubmit(): void {

    if (this.userform.invalid) {
      this.userform.markAllAsTouched();
      return;
    }

    // If edit mode, update existing user
    if (this.isineditmode) {
      this.onupdate();
      return;
    }

    // Add new user
    const newUser: Iuser = {
      ...this.userform.getRawValue(),
      userId: Date.now().toString()
    };

    this._userservice.createadduser(newUser).subscribe({

      next: (message) => {

        this._snackbar.opensnackbar(message);

        this._router.navigate(
          ['/user', newUser.userId],
          {
            queryParams: {
              cr: newUser.userRole
            }
          }
        );

      },

      error: (err) => {
        console.error('Add User Error:', err);
      }

    });

  }

  // CanDeactivate Guard
  CanDeactivate(): boolean {

    if (this.userform && this.userform.dirty && this.isineditmode) {

      return confirm(
        'Are you sure you want to discard the changes?'
      );

    }

    return true;
  }

}
