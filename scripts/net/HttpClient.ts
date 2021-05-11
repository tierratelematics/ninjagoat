import {Observable, from} from "rxjs";
import IHttpClient from "./IHttpClient";
import "whatwg-fetch";
import HttpResponse from "./HttpResponse";
import {injectable} from "inversify";
import Dictionary from "../util/Dictionary";
import {merge} from "lodash";


const binaryMimeTypes = ["application/octet-stream", "application/pdf", "application/zip", "application/x-", "image/", "video/"];

@injectable()
class HttpClient implements IHttpClient {

    get(url: string, headers?: Dictionary<string>): Observable<HttpResponse> {
        return this.performNetworkCall(url, "get", undefined, headers);
    }

    post(url: string, body: {}|FormData, headers?: Dictionary<string>): Observable<HttpResponse> {
        return this.performNetworkCall(url, "post", this.getJsonBody(body), this.addJsonHeaders(headers, body));
    }

    put(url: string, body: {}, headers?: Dictionary<string>): Observable<HttpResponse> {
        return this.performNetworkCall(url, "put", this.getJsonBody(body), this.addJsonHeaders(headers, body));
    }

    delete(url: string, headers?: Dictionary<string>): Observable<HttpResponse> {
        return this.performNetworkCall(url, "delete", undefined, headers);
    }

    private getJsonBody(body: {} | FormData) {
        return !(this.isFormData(body)) ? JSON.stringify(body) : body;
    }

    private addJsonHeaders(headers: Dictionary<string>, body: {} | FormData) {
        return this.isFormData(body)
            ? headers
            : merge({}, {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, headers);
    };

    private performNetworkCall(url: string, method: string, body?: any, headers?: Dictionary<string>): Observable<HttpResponse> {
        let promise = window.fetch(url, {
            method: method,
            body: body,
            headers: <any>headers
        }).then(async response => {
            let headers: Dictionary<string> = {};
            response.headers.forEach((value, name) => {
                headers[name.toString().toLowerCase()] = value;
            });

            let contentType = headers["content-type"] || "";
            let payload: string | Blob = await (this.isBinaryPayload(contentType) ? response.blob() : response.text());
            let parsedPayload: object | string | Blob = contentType.match("application/json") ? JSON.parse(payload.toString()) : payload;

            const httpResponse = new HttpResponse(parsedPayload, response.status, headers);
            if (response.status >= 400)
                throw httpResponse;
            return httpResponse;
        });
        return from(promise);
    }

    private isBinaryPayload(contentType: string): boolean {
        return binaryMimeTypes.some(type => !!contentType.match(type));
    }

    private isFormData(data: any): boolean {
        return data instanceof FormData;
    }
}

export default HttpClient;
