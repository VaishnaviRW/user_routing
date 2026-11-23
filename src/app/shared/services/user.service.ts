import { Injectable } from '@angular/core';
import {  Iuser } from '../model/user';
import { Observable, of } from 'rxjs';
import { Ires } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
UsersDetails: Array<Iuser> = [
  {
    userName: 'Rahul Sharma',
    userId: 'EM101',
    userRole: 'admin',
    profileDescription: 'Frontend developer with expertise in Angular and TypeScript.',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    skills: ['Angular', 'TypeScript', 'HTML', 'CSS'],
    experienceYears: '2 to 4 years',
    isActive: true,
  },
  {
    userName: 'Neha Joshi',
    userId: 'EM102',
    userRole: 'buyer',
    profileDescription: 'Full Stack developer experienced in Angular and Node.js.',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    skills: ['Angular', 'Node.js', 'MongoDB', 'TypeScript'],
    experienceYears: '5 to 7 years',
    isActive: true,
  }
];
  constructor() { }

  fetchuser():Observable<Array<Iuser>>{
    return of( this.UsersDetails)
  }

  FetchuserById(userid:string):Observable<Iuser>{
  let used=this.UsersDetails.find(u => (u.userId===userid))!
  return of(used)

   

  }

  userupdate(user:Iuser):Observable<Ires<Iuser>>{
    let getindex=this.UsersDetails.findIndex(u => (u.userId===user.userId))
    this.UsersDetails[getindex]=user
    return of({
      msg:`user updated ${user.userId} are succefully `,
      data:user
    })
  }

  createadduser(useradd:Iuser):Observable<string>{
  this.UsersDetails.push(useradd)
  return of('The user Added are succefully')

  }

  removeuser(id:string):Observable<Ires<Iuser>>{
    let getindex=this.UsersDetails.findIndex(u => (u.userId===id))
    let remove=this.UsersDetails.splice(getindex, 1)
    return of({
      msg:`The user removed${remove[0].userId} are succefully`,
      data:remove[0]
    })

  }
}
