import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { product  } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:Http) { }
  private baseApiUri= "http://atserve-waterapp.ap-south-1.elasticbeanstalk.com/api/v1/product";

  getProductList() :Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseApiUri, options)
        .pipe(map((response: Response) => <any>response.json()),
        catchError(this.handleError));
  }

  private handleError(error: any) {
    let errMsg = (error.Message) ? error.Message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  updateProduct( model: product): Observable<any> {
    delete model['serviceId'];
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(model);
    return this.http.put(this.baseApiUri + '/update', body, options)
        .pipe(map((response: Response) => response.status == 200 ? 1 : response.status),
        catchError(this.handleError));
}

}
