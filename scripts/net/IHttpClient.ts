import {Observable} from "rxjs";
import HttpResponse from "./HttpResponse";
import Dictionary from "../util/Dictionary";


interface IHttpClient {
    get(url: string, headers?: Dictionary<string>): Observable<HttpResponse>;
    post(url: string, body: {} | FormData, headers?: Dictionary<string>): Observable<HttpResponse>;
    put(url: string, body: {}, headers?: Dictionary<string>): Observable<HttpResponse>;
    delete(url: string, headers?: Dictionary<string>): Observable<HttpResponse>;
}

export default IHttpClient;
