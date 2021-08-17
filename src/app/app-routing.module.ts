import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFileExtensionComponent } from './components/add-file-extension/add-file-extension.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ViewFilesComponent } from './components/view-files/view-files.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {path:'uploadfile' , component: FileUploadComponent},
  {path:'viewfiles' , component: ViewFilesComponent},
  {path:'addfileextension' , component: AddFileExtensionComponent},
  {path:'dashboard' , component: DashboardComponent},
  {path:'**' , component: DashboardComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
