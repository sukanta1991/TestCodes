import { Component, OnInit } from '@angular/core';
import { newservice } from '../newservice';
import {getservice} from '../get-all-service/getservice.service' 
import { product } from '../product';
import {add_product} from './add-product.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  model: any = {};
  model1:product;
  services :newservice[];
  serviceId:number;
  service:newservice;
  errorMessage:string;
  errorMessageBody:string;

   value=0;
  constructor(private _addproduct:add_product,
    private _getservice:getservice,private _router:Router, private _location: Location  ) { }

  ngOnInit() {
    this.getServiceList();
  }


  


  getServiceList(){
    this._getservice.getServiceList().subscribe(data =>{
      this.services = JSON.parse(JSON.stringify(data));
    })

}
myFunction(value)
{
  this.serviceId=parseInt(value);
  
}

onSubmit()
{
  this.model1=this.model;
  this.model1.serviceId=this.serviceId;
  this.model1.imageurl = null;
  this._addproduct.postProductList(this.model1).subscribe(
    successResponse => {
      alert('Product Created Successfully');
      this._router.navigate(['/admin/home']);
    },
    errorResponse   => {
      alert('There was an Error while creating product');
      this.errorMessage = errorResponse.statusText;
      this.errorMessageBody = errorResponse._body;
      console.log(this.errorMessage);
      console.log(this.errorMessageBody);
    }
  );
}
  goBack(){
    this._location.back();
  }

}
