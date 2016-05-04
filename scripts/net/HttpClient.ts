import IHttpClient from "./IHttpClient";
import * as Rx from "rx";
import "whatwg-fetch";
import HttpResponse from "./HttpResponse";

class HttpClient implements IHttpClient {

    get(url:string, headers?:{}):Rx.IObservable<HttpResponse> {
        return this.performNetworkCall(url, 'get');
    }

    post(url:string, body:any, headers?:{}):Rx.IObservable<HttpResponse> {
        return this.performNetworkCall(url, 'post', body);
    }

    put(url:string, body:any, headers?:{}):Rx.IObservable<HttpResponse> {
        return this.performNetworkCall(url, 'put', body);
    }

    delete(url:string, headers?:{}):Rx.IObservable<HttpResponse> {
        return this.performNetworkCall(url, 'delete');
    }

    private performNetworkCall(url:string, method:string, body?:any):Rx.IObservable<HttpResponse> {
        let networkCall = window
            .fetch(url, {
                method: method,
                body: body
            })
            .then(response => {
                return response.json().then(json => new HttpResponse(json, response.headers));
            });
        return Rx.Observable.fromPromise(networkCall);
    }
}

export default HttpClient