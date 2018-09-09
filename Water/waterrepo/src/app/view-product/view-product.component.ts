import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';
import { Http, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {product} from '../product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productList: product[];
  productView: product[];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.fetchProductList();
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

}
