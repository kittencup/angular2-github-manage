import {Inject} from 'angular2/di';
import {Http,Headers,IRequestOptions,EventEmitter} from 'angular2/http';
import * as Rx from 'rx';

export class HttpService {

    protected http:Http;
    protected requestOptions:IRequestOptions;

    constructor(@Inject(Http) http:Http) {
        this.http = http;
    }

    get(url):Rx.Observable<any> {
        return this.http.get(url, this.requestOptions).toRx().map(res=>res.json());
    }

    delete(url):any{
        return this.http.delete(url, this.requestOptions).toRx().map(res=>{
            if(res.status == 200){
                return true;
            }
            return res.json();
        });
    }
}