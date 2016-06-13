/// <reference path="../typings/index.d.ts" />

import {IKernelModule, INewable, IKernel} from "inversify";
import * as Rx from "rx";
import * as React from "react";
import {IPromise} from "rx";

declare module ninjagoat {

    export class Application {
        protected kernel:IKernel;

        run(overrides?:any);

        register(module:IModule);

        protected rootComponent():React.ReactElement<any>;
    }

    export interface Dictionary<T> {
        [index:string]:T
    }

    export interface IModule {
        modules?:IKernelModule;
        register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void;
    }

    export interface IServiceLocator {
        get<T>(key:string, name?:string):T;
    }

    interface IEndpointConfig {
        endpoint:string;
    }

    export interface IViewModelRegistry {
        master<T>(constructor:INewable<IViewModel<T>>, observable?:(context:ViewModelContext) => Rx.IObservable<T>):AreaRegistry;
        index<T>(constructor:INewable<IViewModel<T>>, observable?:(context:ViewModelContext) => Rx.IObservable<T>):AreaRegistry;
        add<T>(constructor:INewable<IViewModel<T>>, observable?:(context:ViewModelContext) => Rx.IObservable<T>, parameters?:string):IViewModelRegistry;
        forArea(area:string):AreaRegistry;
        getArea(areaId:string):AreaRegistry;
        getAreas():AreaRegistry[];
        getEntry<T>(area:string, id:string):{ area:string, viewmodel:RegistryEntry<T> };
    }

    export class AreaRegistry {
        area:string;
        entries:RegistryEntry<IViewModel<any>>[];
    }

    export class RegistryEntry<T> {
        construct:INewable<IViewModel<T>>;
        id:string;
        observableFactory:(context:ViewModelContext) => Rx.IObservable<T>;
        parameters:string;
    }

    export class ViewModelContext {
        area:string;
        viewmodelId:string;
        parameters:any;

        constructor(area:string, viewmodelId:string, parameters?:any);
    }

    export interface IViewModel<T> extends Rx.IDisposable, Rx.IObservable<void> {
        "force nominal type for IViewModel":T;
    }

    export abstract class ObservableViewModel<T> implements IViewModel<T> {
        "force nominal type for IViewModel":T;

        observe(observable:Rx.IObservable<T>);

        subscribe(observer:Rx.IObserver<void>):Rx.IDisposable
        subscribe(onNext?:(value:void) => void, onError?:(exception:any) => void, onCompleted?:() => void):Rx.IDisposable;

        dispose():void
    }

    export abstract class View<T> extends React.Component<{ viewmodel:T }, {}> {
        public viewModel:T;

        abstract render();
    }

    export function ViewModel(name:string);

    export function Refresh(target:any, propertyKey:string, descriptor:TypedPropertyDescriptor<any>);

    interface RegistrationKeysStatic {
        Config_Base:string;
    }

    export var RegistrationKeys:RegistrationKeysStatic;

    export interface IHttpClient {
        get(url:string, headers?:Dictionary<string>):Rx.Observable<HttpResponse>
        post(url:string, body:any, headers?:Dictionary<string>):Rx.Observable<HttpResponse>
        put(url:string, body:any, headers?:Dictionary<string>):Rx.Observable<HttpResponse>
        delete(url:string, headers?:Dictionary<string>):Rx.Observable<HttpResponse>
    }

    export class HttpClient implements IHttpClient {

        get(url:string, headers?:Dictionary<string>):Rx.Observable<HttpResponse>;

        post(url:string, body:{}|FormData, headers?:Dictionary<string>):Rx.Observable<HttpResponse>;

        put(url:string, body:{}, headers?:Dictionary<string>):Rx.Observable<HttpResponse>;

        delete(url:string, headers?:Dictionary<string>):Rx.Observable<HttpResponse>;
    }

    export class HttpResponse {
        response:any;
        headers:Dictionary<string>;

        constructor(response:any, headers?:Dictionary<string>);
    }

    export interface IDateRetriever {
        getDate():string;
    }

    export interface IGUIDGenerator {
        generate():string;
    }

    export interface ILogger {
        debug(message:string);

        info(message:string);

        warning(message:string);

        error(error:string|Error);

        setLogLevel(level:LogLevel);
    }

    export enum LogLevel {
        Debug,
        Info,
        Warning,
        Error
    }

}

export = ninjagoat;