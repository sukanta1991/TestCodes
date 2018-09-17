import { Component, OnInit } from '@angular/core';
import {newservice} from '../newservice';
import { getservice} from './getservice.service'; 
import {product} from '../product';
import {  ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-get-all-service',
  templateUrl: './get-all-service.component.html',
  styleUrls: ['./get-all-service.component.css']
})
export class GetAllServiceComponent implements OnInit {

  constructor(private route: ActivatedRoute,private getservice:getservice,private formBuilder: FormBuilder) { }
   services :newservice[]
       service:newservice;
       products:product[];
       product:product;
       sId: number;
       sModel: newservice;
       errMsg:string;
       private route$: any;


  ngOnInit() {
this.getServiceList();
}
ngOnDestroy() {
  if (this.route$) this.route$.unsubscribe();
}

  
  getServiceList(){
    this.getservice.getServiceList().subscribe(data =>{
      this.services = JSON.parse(JSON.stringify(data));
    })

}
}
