import IHttpClient from "./IHttpClient";
import * as Rx from "rx";
import "whatwg-fetch";

class HttpClient implements IHttpClient {

    get(url:string, headers?:{}):Rx.IObservable<any> {
        return this.performNetworkCall(url, 'get');
    }

    post(url:string, body:any, headers?:{}):Rx.IObservable<any> {
        return this.performNetworkCall(url, 'post', body);
    }

    put(url:string, body:any, headers?:{}):Rx.IObservable<any> {
        return this.performNetworkCall(url, 'put', body);
    }

    delete(url:string, headers?:{}):Rx.IObservable<any> {
        return this.performNetworkCall(url, 'delete');
    }

    private performNetworkCall(url:string, method:string, body:any):Rx.IObservable<any> {
        return Rx.Observable.fromPromise(window.fetch(url, {
            method: method,
            body: body
        }));
    }
}

