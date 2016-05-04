import * as Rx from "rx";

interface IHttpClient {
    get(url:string, headers?:{}):Rx.IObservable<any>
    post(url:string, body:any, headers?:{}):Rx.IObservable<any>
    put(url:string, body:any, headers?:{}):Rx.IObservable<any>
    delete(url:string, headers?:{}):Rx.IObservable<any>
}

export default IHttpClient