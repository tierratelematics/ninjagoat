import * as Rx from "rx";
import HttpResponse from "./HttpResponse";
import HttpHeaders from "./HttpHeaders";

interface IHttpClient {
    get(url:string, headers?:HttpHeaders):Rx.IObservable<HttpResponse>
    post(url:string, body:{}|FormData, headers?:HttpHeaders):Rx.IObservable<HttpResponse>
    put(url:string, body:{}, headers?:HttpHeaders):Rx.IObservable<HttpResponse>
    delete(url:string, headers?:HttpHeaders):Rx.IObservable<HttpResponse>
}

export default IHttpClient
