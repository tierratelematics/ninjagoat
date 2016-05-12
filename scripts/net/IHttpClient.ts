import * as Rx from "rx";
import HttpResponse from "./HttpResponse";
import HttpHeaders from "./HttpHeaders";

interface IHttpClient {
    get(url:string, headers?:HttpHeaders):Rx.Observable<HttpResponse>
    post(url:string, body:{}|FormData, headers?:HttpHeaders):Rx.Observable<HttpResponse>
    put(url:string, body:{}, headers?:HttpHeaders):Rx.Observable<HttpResponse>
    delete(url:string, headers?:HttpHeaders):Rx.Observable<HttpResponse>
}

export default IHttpClient
