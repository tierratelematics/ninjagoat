import IHttpClient from "./IHttpClient";
import * as Rx from "rx";
import "whatwg-fetch";
import HttpResponse from "./HttpResponse";
import {injectable} from "inversify";
import Dictionary from "../util/Dictionary";
import * as _ from "lodash";

@injectable()
class HttpClient implements IHttpClient {

    get(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, "get", undefined, headers);
    }

    post(url: string, body: {}|FormData, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, "post", this.getJsonBody(body), this.addJsonHeaders(headers, body));
    }

    put(url: string, body: {}, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, "put", this.getJsonBody(body), this.addJsonHeaders(headers, body));
    }

    delete(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, "delete", undefined, headers);
    }

    private getJsonBody(body: {}|FormData) {
        return !(this.isFormData(body)) ? JSON.stringify(body) : body;
    }

    private addJsonHeaders(headers: Dictionary<string>, body: {}|FormData) {
        return this.isFormData(body)
            ? headers
            : _.merge({}, {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, headers);
    };

    private performNetworkCall(url: string, method: string, body?: any, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        let promise = window.fetch(url, {
            method: method,
            body: body,
            headers: <any>headers
        }).then(response => {
            let headers: Dictionary<string> = {};
            response.headers.forEach((value, name) => {
                headers[name.toString().toLowerCase()] = value;
            });
            return response.text().then(text => {
                let contentType = headers["content-type"] || "";
                let payload = contentType.match("application/json") ? JSON.parse(text) : text;
                let httpResponse = new HttpResponse(payload, response.status, headers);

                if (response.status >= 400)
                    throw httpResponse;
                return httpResponse;
            });
        });
        return Rx.Observable.fromPromise(promise);
    }

    private isFormData(data: any): boolean {
        return data instanceof FormData;
    }
}

export default HttpClient
