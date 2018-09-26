import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {getservice} from '../get-all-service/getservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css']
})
export class NewServiceComponent implements OnInit {
  private serviceactiveflag: boolean = true;
  model: any = {};
  private errorMessage:string;
  private errorMessageBody:string;

  constructor(private _getservice:getservice,private router:Router ) { }

  public onserviceactiveflagchecked(value:boolean){
    this.serviceactiveflag = value;
  }

  onSubmit() {
    this._getservice.postServiceList(this.model).subscribe(
      successResponse => {
        alert('Service Created Successfully');
        this.router.navigate(['/admin/home']);
      },
      errorResponse   => {
        alert('There was an Error while creating service');
        this.errorMessage = errorResponse.statusText;
        this.errorMessageBody = errorResponse._body;
      }
    );
  }
  
  

  ngOnInit() {
  }

}
