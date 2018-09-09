import { Injectable } from '@angular/core';
import { Http,Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: Http) { }

  add(vendor: any): Observable<any> {
    let apiURL = 'http://atserve-waterapp.ap-south-1.elasticbeanstalk.com/api/v1/vendor';
    // let apiURL ='http://localhost:8080/api/v1/vendor';
    console.log(vendor);
    return this.http.post(apiURL, vendor);

  }

  addVendor(dataString) {
    console.log("dataString ", JSON.stringify(dataString));
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let apiURL = 'http://atserve-waterapp.ap-south-1.elasticbeanstalk.com/api/v1/vendor';
    // let apiURL ='http://localhost:8080/api/v1/vendor';
    return this.http.post(apiURL, dataString, options)
      .pipe(
        map((response: Response) => response.json())
      );
  }
  private getHeaders(): RequestOptions {
    let reqOp = new RequestOptions();

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', '*');

    reqOp.headers = headers;

    return reqOp;
  }
}
