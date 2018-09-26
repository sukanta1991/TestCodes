import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import {newservice} from '../newservice';

@Injectable({
    providedIn: 'root'
  })
export class getservice
{
    constructor(private http:Http) { }
    private baseApiUri= "http://atserve-waterapp.ap-south-1.elasticbeanstalk.com/api/v1/service";
    private baseApiUriDelete="http://atserve-waterapp.ap-south-1.elasticbeanstalk.com/api/v1/service/delete?serviceId=";

    getServiceList() :Observable<any> {
        let headers = new Headers({  });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseApiUri, options)
            .pipe(map((response: Response) => <any>response.json()),
            catchError(this.handleError));
      }

      postServiceList(model: newservice): Observable<any> {
       // let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append("Accept", "application/json");
        //let options = new RequestOptions({ headers: headers });
        let body = (model);
        console.log(JSON.stringify(body)+"Body hitted");
        return this.http.post(this.baseApiUri, body )
            
            
  
    }

    deleteService(id: number): Observable<any> {
      
       // let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.baseApiUriDelete + id)
            .pipe(map((response: Response) => response.json()),
            catchError(this.handleError));
    }

    updateService( model: newservice): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(model);
        return this.http.put(this.baseApiUri + '/update', body, options)
            .pipe(map((response: Response) => response.status == 200 ? 1 : response.status),
            catchError(this.handleError));
    }

    private handleError(error: any) {
        console.log("err");
        let errMsg = (error.Message) ? error.Message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        console.log("oops got error");
        return Observable.throw(errMsg);
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