import { Component, OnInit } from '@angular/core';
import {vendordetails} from './vendordetails';
import {ProductService} from '../view-productlist/product.service';
import {getallvendor} from '../getallvendor.service';
import { product } from '../product';

@Component({
  selector: 'app-product-to-vendor',
  templateUrl: './product-to-vendor.component.html',
  styleUrls: ['./product-to-vendor.component.css']
})
export class ProductToVendorComponent implements OnInit {
    public vendor:vendordetails;
    public vendors:vendordetails[];
    model:any ={};
    productList: product[];
  productView: product[];
  

  constructor(private _getvendorlist:getallvendor,private _productlist:ProductService) { }

  ngOnInit() {
   
    this.getVendorlist();
    this.fetchProductList();
  }

  getVendorlist()
  {
    this._getvendorlist.getvendorList().subscribe(data =>{
      this.vendors = JSON.parse(JSON.stringify(data));
    })

  }
  fetchProductList(){
    this._productlist.getProductList().subscribe(data => {
      this.productList = data;
      this.productList.map(x=>{
        x["startdates"] = new Date(x.startdate).toDateString();
        x["enddates"] = new Date(x.enddate).toDateString();
      })
     this.productView = JSON.parse(JSON.stringify(data));
  })
  }

  myFunction1(value)
  {
   this.model.vendorid=parseInt(value);
  }
  myFunction2(value)
  {
    this.model.productid=parseInt(value);

  }

  onSubmit()
  {
    console.log(this.model);
  }

}
