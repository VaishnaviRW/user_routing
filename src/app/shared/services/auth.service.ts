import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { iuserlogindetail, iusersinup } from '../model/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
Auth_baseurl:string=environment.Auth_url
  constructor(private _httpclint : HttpClient) { }

 Login(userlogin:iuserlogindetail):Observable<any>{
  let loginurl=`${this.Auth_baseurl}/api/auth/login`
 return this._httpclint.post(loginurl, userlogin)

 }

 signup(usersinup:iusersinup):Observable<any>{
  let sinupurl=`${this.Auth_baseurl}/api/auth/register`
return  this._httpclint.post(sinupurl, usersinup)

 }

 savetoken(token:string){
  localStorage.setItem('token', token)
 }

 saveuserrole(userRole:string){
  localStorage.setItem('userRole', userRole)
 }


  gettoken():string|null{
return localStorage.getItem('token')
 }

   getuserRole():string|null{
 return localStorage.getItem('userRole')
 }

 logoutstatus(){
localStorage.removeItem('token')
localStorage.removeItem('userRole')

 }
}
