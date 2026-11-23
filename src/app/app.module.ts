import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { HomeComponent } from './shared/component/home/home.component';
import { approuting } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule  } from "@angular/material/button";
import {MatCardModule  } from "@angular/material/card";
import {MatIconModule  } from "@angular/material/icon";
import {MatSnackBarModule  } from "@angular/material/snack-bar";
import {MatDialogModule  } from "@angular/material/dialog";
import { GetconfirmComponent } from './shared/component/getconfirm/getconfirm.component';
import { UserDashboardComponent } from './shared/component/user-dashboard/user-dashboard.component';
import { UserDetailComponent } from './shared/component/user-dashboard/user-detail/user-detail.component';
import { UserFormComponent } from './shared/component/user-dashboard/user-form/user-form.component';
import {MatChipsModule  } from "@angular/material/chips";
import { AuthComponent } from './shared/component/auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './shared/services/loader.interceptor';
import { LoaderComponent } from './shared/component/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GetconfirmComponent,
    UserDashboardComponent,
    UserDetailComponent,
    UserFormComponent,
    AuthComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    approuting,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    HttpClientModule
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
