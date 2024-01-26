import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptInterceptor } from './services/intercept.interceptor';
import { DialogComponent } from './shared/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HeaderComponent } from './shared/header/header.component';
import {MatTableModule} from '@angular/material/table';
import { AddItemsComponent } from './components/admin-dashboard/sub-modules/add-items/add-items.component';
import {MatSelectModule} from '@angular/material/select';
import { AddBrandComponent } from './components/admin-dashboard/sub-modules/add-brand/add-brand.component';
import { AddCategoryComponent } from './components/admin-dashboard/sub-modules/add-category/add-category.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    SpinnerComponent,
    DialogComponent,
    HeaderComponent,
    AddItemsComponent,
    AddBrandComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
