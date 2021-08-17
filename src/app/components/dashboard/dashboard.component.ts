import { Component, OnInit ,  Input  } from '@angular/core';
import{ files } from './../../models/files'
import{ Extensions } from './../../models/extensions'
import {FileOperationsService}  from './../../services/file-operations.service'
import { PaginatedResult, Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
ex : any
ex1 : any
Files : files[] 
Extensions : Extensions[]
userParams: any = {};
pagination: Pagination;
@Input() extName:any; 
constructor(private FileOperationsService: FileOperationsService) { 
  this.pagination = {itemsPerPage: 5 , currentPage : 1 , totalItems : 1 , totalPages: 1 }
}

ngOnInit() {
  this.fetchAllFiles();
}
pageChanged(event: any): void {
  this.pagination.currentPage = event.page;
  this.fetchAllFiles();
}
fetchAllFiles() {
  this.FileOperationsService.getExtensions(this.extName,this.pagination.currentPage, this.pagination.itemsPerPage,  this.userParams)
  .subscribe((res: PaginatedResult<Extensions[]>) => {
    console.log(res)
    this.Extensions = res.result;
    this.pagination = res.pagination;
}, error => {
  console.log(error)
});

}}
