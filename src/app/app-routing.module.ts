import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/component/home/home.component';
import { UserDashboardComponent } from './shared/component/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './shared/component/user-dashboard/user-form/user-form.component';
import { UserDetailComponent } from './shared/component/user-dashboard/user-detail/user-detail.component';
import { AuthComponent } from './shared/component/auth/auth.component';

import { authguard } from './shared/component/Guard/auth.guard';
import { userRolegaurd } from './shared/component/Guard/userRole.gaurd';
import { candactivateguard } from './shared/component/Guard/candiactivateguard.guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [authguard, userRolegaurd],
    data: { userRole: ['admin', 'superAdmin'] },
    children: [
      { path: 'adduser', component: UserFormComponent },
      { path: ':id', component: UserDetailComponent },
      { path: ':id/edit', component: UserFormComponent, canDeactivate: [candactivateguard] }
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class approuting {}
