import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ViewFilesComponent } from './components/view-files/view-files.component';
import { AddFileExtensionComponent } from './components/add-file-extension/add-file-extension.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [	
    AppComponent,
    FileUploadComponent ,
    ViewFilesComponent ,
    DashboardComponent ,
    AddFileExtensionComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
