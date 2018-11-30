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
        return this.performNetworkCall(url, "post", this.getJsonBody(body), this.addJsonHeaders(headers));
    }

    put(url: string, body: {}, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, "put", this.getJsonBody(body), this.addJsonHeaders(headers));
    }

    delete(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, "delete", undefined, headers);
    }

    private getJsonBody(body: {}|FormData) {
        return !(body instanceof FormData) ? JSON.stringify(body) : body;
    }

    private addJsonHeaders(headers: Dictionary<string>) {
        return _.merge({}, {
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

            let contentType = headers["content-type"] || "";
            if(this.isBinaryPayload(contentType)){
                return response.blob().then(blob => [blob, response.status, response.headers]);
            } else {
                return response.text().then(text => [contentType.match("application/json") ? JSON.parse(text) : text, response.status, response.headers])
            }
        }).then(data => {
            let [payload, status, headers] = data;
            let httpResponse = new HttpResponse(payload, status, headers);

            if (status >= 400)
                throw httpResponse;
            return httpResponse;
        });

        return Rx.Observable.fromPromise(promise);
    }

    private isBinaryPayload(contentType: string): boolean {
        const binaryMimeTypes = ["application/octet-stream", "application/pdf", "application/zip", "application/x-", "image/", "video/"];
        return binaryMimeTypes.some(type => !!contentType.match(type));
    }
}

export default HttpClient
