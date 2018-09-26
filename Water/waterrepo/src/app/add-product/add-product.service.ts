import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import {newservice} from '../newservice';
import { product } from '../product';

@Injectable({
    providedIn: 'root'
  })

  export class add_product{

    constructor(private http:Http) { }
    private baseApiUri= "http://atserve-waterapp.ap-south-1.elasticbeanstalk.com/api/v1/product";

    postProductList(model:product):Observable<any>
    {
       // let headers = new Headers({ 'Content-Type': 'application/json' });
       // headers.append("Accept", "application/json");
       // let options = new RequestOptions({ headers: headers });
        let body = (model);
        console.log(JSON.stringify(body)+"Body hitted");
        return this.http.post(this.baseApiUri, body);
    }

  }