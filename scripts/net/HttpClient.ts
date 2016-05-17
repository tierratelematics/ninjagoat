import IHttpClient from "./IHttpClient";
import * as Rx from "rx";
import "whatwg-fetch";
import HttpResponse from "./HttpResponse";
import {injectable} from "inversify";
import Dictionary from "../util/Dictionary";

@injectable()
class HttpClient implements IHttpClient {

    get(url:string, headers?:Dictionary<string>):Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'get', null, headers);
    }

    post(url:string, body:{}|FormData, headers?:Dictionary<string>):Rx.Observable<HttpResponse> {
        if (!(body instanceof FormData))
            body = JSON.stringify(body);
        return this.performNetworkCall(url, 'post', body, headers);
    }

    put(url:string, body:{}, headers?:Dictionary<string>):Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'put', JSON.stringify(body), headers);
    }

    delete(url:string, headers?:Dictionary<string>):Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'delete', null, headers);
    }

    private performNetworkCall(url:string, method:string, body?:any, headers?:Dictionary<string>):Rx.Observable<HttpResponse> {
        return Rx.Observable.fromPromise(
            window.fetch(url, {
                method: method,
                body: body,
                headers: headers
            }).then(response => {
                let headers:Dictionary<string> = {};
                response.headers.forEach((value, name) => {
                    headers[name] = value;
                });
                return response.json().then(json => new HttpResponse(json, headers));
            })
        );
    }
}

export default HttpClient