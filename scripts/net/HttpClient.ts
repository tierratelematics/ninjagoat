import IHttpClient from "./IHttpClient";
import * as Rx from "rx";
import "whatwg-fetch";
import HttpResponse from "./HttpResponse";
import {inject, injectable} from "inversify";
import Dictionary from "../util/Dictionary";
import * as _ from "lodash";
import {ILogger, NullLogger, LoggingContext} from "inversify-logging";

@injectable()
@LoggingContext("HttpClient")
class HttpClient implements IHttpClient {

    @inject("ILogger") private logger: ILogger;

    get(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'get', undefined, headers);
    }

    post(url: string, body: {}|FormData, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'post', this.getJsonBody(body), this.addJsonHeaders(headers));
    }

    put(url: string, body: {}, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'put', this.getJsonBody(body), this.addJsonHeaders(headers));
    }

    delete(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return this.performNetworkCall(url, 'delete', undefined, headers);
    }

    private getJsonBody(body: {}|FormData) {
        return !(body instanceof FormData) ? JSON.stringify(body) : body;
    }

    private addJsonHeaders(headers: Dictionary<string>) {
        return _.merge({}, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, headers);
    };

    private performNetworkCall(url: string, method: string, body?: any, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        let promise = window.fetch(url, {
            method: method,
            body: body,
            headers: headers
        }).then(response => {
            let headers: Dictionary<string> = {};
            response.headers.forEach((value, name) => {
                headers[name.toString().toLowerCase()] = value;
            });
            return response.text().then(text => {
                let contentType = headers["content-type"] || "";
                let payload = contentType.match("application/json") ? JSON.parse(text) : text;
                let httpResponse = new HttpResponse(payload, response.status, headers);

                this.logger.debug(`HTTP request result ${JSON.stringify(httpResponse)}`);
                if (response.status >= 400)
                    throw httpResponse;
                return httpResponse;
            });
        });
        return Rx.Observable.fromPromise(promise);
    }
}

export default HttpClient
