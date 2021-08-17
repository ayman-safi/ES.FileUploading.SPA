import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { files } from './../models/files';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { PaginatedResult } from '../models/pagination';
import{ Extensions } from '../models/extensions';

@Injectable({
  providedIn: 'root'
})
export class FileOperationsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFiles(extensionName,page?, itemsPerPage?, userParams?): Observable<PaginatedResult<files[]>> {
    const paginatedResult: PaginatedResult<files[]> = new PaginatedResult<files[]>();
    let params = new HttpParams();
    params = params.append('extensionName', extensionName);
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    let obj = {
      extensionName :extensionName ,
      pageNumber : page ,
      pageSize :itemsPerPage
    }
    console.log(params)
    return this.http.post<files[]>(this.baseUrl + 'GetAllFile', obj ,  { observe: 'response'})
    .pipe(
      map(response => {

        paginatedResult.result = response.body;
        if (response.headers?.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );

  }
  getExtensions(extensionName,page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Extensions[]>> {
    const paginatedResult: PaginatedResult<Extensions[]> = new PaginatedResult<Extensions[]>();
    let params = new HttpParams();
    params = params.append('extensionName', extensionName);
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    let obj = {
      extensionName :extensionName,
      pageNumber : page ,
      pageSize :itemsPerPage
    }
    console.log(params)
    return this.http.post<Extensions[]>(this.baseUrl + 'GetAllExtensionsHasFiles', obj ,  { observe: 'response'})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers?.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );

  }

  getAllExtensions(): Observable<Extensions[]> {

    return this.http.get<Extensions[]>(this.baseUrl + 'GetAllExtenstion' , { observe: 'response'})
    .pipe(
      map(response => { return response.body;
      })
    );
  }
  getFile(id): Observable<files> {
    return this.http.get<files>(this.baseUrl + 'files/' + id);
  }

  uploadFile(file: any){
    return this.http.post(this.baseUrl+ 'UploadFile',file);
  }
  createExtension(ext: Extensions){
    return this.http.post(this.baseUrl+ 'CreateExtension',ext);
  }
  
}
