import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
  
 
})
export class AuthComponent implements OnInit {
allreadyhaveaccount:boolean=false

signupform!:FormGroup
loginform!:FormGroup
  constructor(private _authservice : AuthService,
    private _router :Router,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
   this.createsignupform()
   this.createloginform()
   
  }

  createsignupform(){
     this.signupform=new FormGroup({
      email:new FormControl(null, Validators.required),
      password:new FormControl(null, Validators.required),
      userRole:new FormControl('admin')
    })
  }

  createloginform(){
    this.loginform=new FormGroup({
    email:new FormControl(null, Validators.required),
    password:new FormControl(null, Validators.required)
   })
  }


  onsinupform(){
    if(this.signupform.invalid){
      this.signupform.markAllAsTouched()
    }else{
      let signupdetai=this.signupform.value
        this._authservice.signup(signupdetai)
        .subscribe({
          next:data=> {
            console.log(data);
            this.allreadyhaveaccount=true
            this._snackbar.opensnackbar(data.message)
          },
          error:err=>{
            this._snackbar.opensnackbar(err.error.message)

          }
        })
  }
}
onloginform(){
if(this.loginform.invalid){
  this.loginform.markAllAsTouched()
}else{
  let logindetail=this.loginform.value
   this._authservice.Login(logindetail)
   .subscribe({
    next:data=> {
      console.log(data);
      this._authservice.savetoken(data.token)
      console.log(data.token)
      this._authservice.saveuserrole(data.userRole)
  this._router.navigate(['/home'])
      
       this._snackbar.opensnackbar(data.message)
          },
          error:err=>{
            this._snackbar.opensnackbar(err.error.message)

          }
   })
}
}
}
