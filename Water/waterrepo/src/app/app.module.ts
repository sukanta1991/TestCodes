import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { StorageServiceModule} from 'angular-webstorage-service';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { VendorCreateComponent } from './vendor-create/vendor-create.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { GetAllServiceComponent } from './get-all-service/get-all-service.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { AddProductComponent } from './add-product/add-product.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin/home',
    component: AdminHomeComponent
  },
  {
    path: 'vendor/create',
    component: VendorCreateComponent
  },
  {
    path:'newservice/create',
    component: NewServiceComponent
  },
  {
    path:'getallservice',
    component: GetAllServiceComponent
  },
  {
    path:'newproduct',
    component:AddProductComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminHomeComponent,
    VendorCreateComponent,
    NewServiceComponent,
    GetAllServiceComponent,
    OtpVerificationComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
