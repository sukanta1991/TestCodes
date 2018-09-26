import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class getallvendor {
    constructor(private http:Http) { }
    private baseApiUri= "http://atserve-waterapp.ap-south-1.elasticbeanstalk.com/api/v1/vendor";


    getvendorList():Observable<any> {

        let headers = new Headers();
        let key="Authorization";
        let value="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwidXNlcl9uYW1lIjoiNzkwNjkyMzQ0NiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1MzcyOTc4MjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVkVORE9SIl0sImp0aSI6IjBiNmQwMjQ5LTVjNGUtNDc0OS04YjMxLWMzMGRjMGY2YmE3NiIsImNsaWVudF9pZCI6InRlc3Rqd3RjbGllbnRpZCJ9.teDiJaupxmXmcc63mMeBUaKttJM4UNYmSwJi0kRf70I";
        headers.append(key,value);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseApiUri, options)
        .pipe(map((response: Response) => <any>response.json()),
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
  

}