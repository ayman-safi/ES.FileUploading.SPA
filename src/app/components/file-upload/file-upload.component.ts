import { Component ,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators , FormBuilder} from '@angular/forms';
import { files } from './../../models/files';
import {FileOperationsService}  from './../../services/file-operations.service'
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors , ValidatorFn } from '@angular/forms';
import{ Extensions } from './../../models/extensions'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(private fileOperationsService: FileOperationsService , private fb: FormBuilder, private router: Router) { }
  selectedFile: File = null;
  fileName : string ;
Extensions : Extensions[];
list : any  = [];
  public uploadFileForm: FormGroup;
  // constructor(private http: HttpClient) { }
  
  ngOnInit() {
this.createForm();
  }
  
  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    this.fileName =fileInput.target.files[0].name;
  }
  
  onSubmit(data) {
    const formData = new FormData();
    formData.append('File', this.selectedFile);
  
    this.fileOperationsService.uploadFile(formData)
    .subscribe(res => {  this.router.navigate(['dashboard/']);
    });
  
    this.uploadFileForm.reset();
  }

  createForm() {

     this.uploadFileForm = this.fb.group({
       File: ['', [
                  Validators.required , 
                  this.fileExtensionValidator(this.fileOperationsService ,this.fileName)]
              ],
     });
   }

  fileExtensionValidator(dataService:FileOperationsService , fileName : any ): ValidatorFn {
      return (control: AbstractControl) => {
   dataService.getAllExtensions().subscribe((res: Extensions[]) => {
     this.list = [];
     res.forEach(item=> ( this.list?.push(item.extensionName)
     ));
      }, error => {
        console.log(error.message)
      });

         
        if (control.value && this.list.includes(fileName))
          return null;
        else
          return { 'extension is not recognized!' : { value: control.value } };
      }
    }
}
