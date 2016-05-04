import * as Rx from "rx";
import HttpResponse from "./HttpResponse";

interface IHttpClient {
    get(url:string, headers?:{}):Rx.IObservable<HttpResponse>
    post(url:string, body:any, headers?:{}):Rx.IObservable<HttpResponse>
    put(url:string, body:any, headers?:{}):Rx.IObservable<HttpResponse>
    delete(url:string, headers?:{}):Rx.IObservable<HttpResponse>
}

export default IHttpClient
