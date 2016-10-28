import IHttpClient from "./IHttpClient";
import * as Rx from "rx";
import "whatwg-fetch";
import HttpResponse from "./HttpResponse";
import {injectable} from "inversify";
import Dictionary from "../util/Dictionary";
import * as _ from "lodash";
import * as Promise from "bluebird";

@injectable()
class HttpClient implements IHttpClient {

    get(url:string, headers?:Dictionary<string>):Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'get', undefined, headers);
    }

    post(url:string, body:{}|FormData, headers?:Dictionary<string>):Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'post', this.getJsonBody(body), this.addJsonHeaders(headers));
    }

    put(url:string, body:{}, headers?:Dictionary<string>):Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'put', this.getJsonBody(body), this.addJsonHeaders(headers));
    }

    delete(url:string, headers?:Dictionary<string>):Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'delete', undefined, headers);
    }

    private getJsonBody(body:{}|FormData) {
        return !(body instanceof FormData) ? JSON.stringify(body) : body;
    }

    private addJsonHeaders(headers:Dictionary<string>) {
        return _.merge(headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    };

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
                return response.text().then(text => {
                    if (response.status === 204)
                        return Promise.resolve(new HttpResponse(null, response.status, headers));
                    let httpResponse = new HttpResponse(JSON.parse(text), response.status, headers);
                    if (response.status >= 400)
                        return Promise.reject(httpResponse);
                    return httpResponse;
                });
            })
        );
    }
}

export default HttpClient