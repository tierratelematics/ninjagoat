import IHttpClient from "./IHttpClient";
import * as Rx from "rx";
import "whatwg-fetch";
import HttpResponse from "./HttpResponse";
import HttpHeaders from "./HttpHeaders";

class HttpClient implements IHttpClient {
    
    get(url:string, headers?:HttpHeaders):Rx.IObservable<HttpResponse> {
        return this.performNetworkCall(url, 'get', null, headers);
    }

    post(url:string, body:{}|FormData, headers?:HttpHeaders):Rx.IObservable<HttpResponse> {
        if (!(body instanceof FormData))
            body = JSON.stringify(body);
        return this.performNetworkCall(url, 'post', body, headers);
    }

    put(url:string, body:{}, headers?:HttpHeaders):Rx.IObservable<HttpResponse> {
        return this.performNetworkCall(url, 'put', JSON.stringify(body), headers);
    }

    delete(url:string, headers?:HttpHeaders):Rx.IObservable<HttpResponse> {
        return this.performNetworkCall(url, 'delete', null, headers);
    }

    private performNetworkCall(url:string, method:string, body?:any, headers?:HttpHeaders):Rx.IObservable<HttpResponse> {
        return Rx.Observable.fromPromise(
            window.fetch(url, {
                method: method,
                body: body,
                headers: headers
            }).then(response => {
                return response.json().then(json => new HttpResponse(json, response.headers));
            })
        );
    }
}

export default HttpClient