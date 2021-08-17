import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Extensions } from './../../models/Extensions';
import { Router } from '@angular/router';
import {FileOperationsService}  from './../../services/file-operations.service'

@Component({
  selector: 'app-add-file-extension',
  templateUrl: './add-file-extension.component.html',
  styleUrls: ['./add-file-extension.component.scss']
})
export class AddFileExtensionComponent implements OnInit {
  Extension: Extensions;
  createForm: FormGroup;
    constructor(private fb: FormBuilder ,
      private FileOperationsService: FileOperationsService, private router: Router) {
        }
  
    ngOnInit() {
      this.createExtensionForm();
    }
  
  
    create() {
      this.Extension = Object.assign({}, this.createForm.value);
        this.FileOperationsService.createExtension(this.Extension).subscribe(
          data => { this.router.navigate(['/dashboard/']);
        },
           error => console.log(error)
        );
      }
  
    createExtensionForm() {
      // this is supposed to work but 3 char input return false
     const regex = "^(.(([a-z]|[A-Z]){2,4}))$";

      this.createForm = this.fb.group({
        extensionName : ['', Validators.compose([Validators.required , Validators.pattern(regex)]) ],
        maxAllowedSize: ['', Validators.required ],
      });
    }
  
}
