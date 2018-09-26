import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';
import { Http, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {product} from '../product';
import {ProductService} from './product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-productlist',
  templateUrl: './view-productlist.component.html',
  styleUrls: ['./view-productlist.component.css']
})
export class ViewProductlistComponent implements OnInit {
  productList: product[];
  productView: product[];
  pModel: product;
  pId:number;
  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.fetchProductList();
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 3000);
   
  }

  fetchProductList(){
    this.productService.getProductList().subscribe(data => {
      this.productList = data;
      this.productList.map(x=>{
        x["startdates"] = new Date(x.startdate).toDateString();
        x["enddates"] = new Date(x.enddate).toDateString();
      })
     this.productView = JSON.parse(JSON.stringify(data));
  })
  }
  onKey(event: any){
    if(event.target.value)
    {
      this.productView = this.productList.filter(x=>
        {
          return x.productname.toLowerCase().includes(event.target.value.trim());
        });
    }
    else
    {
      this.productView = JSON.parse(JSON.stringify(this.productList));
    }
  }

  updateProduct(){
    this.productService.updateProduct(this.pModel).subscribe(data=>{
      console.log(data);
      this.pId = -1;
      this.fetchProductList();
    })
  }

}
