/// <reference path="../typings/index.d.ts" />

import {IKernelModule, INewable, IKernel} from "inversify";
import * as Rx from "rx";
import * as React from "react";
import {IPromise} from "rx";

declare module ninjagoat {

    export class Application {
        run(overrides?:any);

        register(module:IModule);
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
        getEntry<T>(area:string, id:string):RegistryEntry<T>;
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

    export class ModelState<T> {
        phase:ModelPhase;
        model:T;
        failure:any;

        static Loading<T>():ModelState<T>;

        static Ready<T>(model:T):ModelState<T>;

        static Failed<T>(failure:any):ModelState<T>;
    }

    export enum ModelPhase {
        Loading,
        Ready,
        Failed
    }

    interface CommandDecoratorsStatic {
        Authentication(type:string)
        Endpoint(endpoint:string)
        Transport(type:string)
        Type(type:string)
    }

    export var CommandDecorators:CommandDecoratorsStatic;

    interface AuthenticationStatic {
        Bearer:string;
        Basic:string;
    }

    export var Authentication:AuthenticationStatic;

    interface TransportStatic {
        HTTP_Post:string,
        WebSocket:string
    }

    export var Transport:TransportStatic;

    interface RegistrationStatic {
        Config_Base:string;
        Config_WebSocket:string;
    }

    export var Registration:RegistrationStatic;

    export interface IHttpClient {
        get(url:string, headers?:Dictionary<string>):Rx.Observable<HttpResponse>
        post(url:string, body:any, headers?:Dictionary<string>):Rx.Observable<HttpResponse>
        put(url:string, body:any, headers?:Dictionary<string>):Rx.Observable<HttpResponse>
        delete(url:string, headers?:Dictionary<string>):Rx.Observable<HttpResponse>
    }

    export class HttpResponse {
        response:any;
        headers:Dictionary<string>;
    }

    export interface IModelRetriever {
        modelFor<T>(context:ViewModelContext):Rx.Observable<ModelState<T>>;
    }

    export class ModelRetriever implements IModelRetriever {
        modelFor<T>(context:ViewModelContext):Rx.Observable<ModelState<T>>;
    }

    export interface ICommandDispatcher {
        dispatch(command:Object, metadata?:Dictionary<any>):Rx.IPromise<CommandResponse>;
    }

    export interface CommandResponse {
        response:any;
    }

    export interface IDateRetriever {
        getDate():string;
    }

    export interface IGUIDGenerator {
        generate():string;
    }

    export abstract class CommandDispatcher implements ICommandDispatcher {

        constructor(dateRetriever:IDateRetriever, guidGenerator:IGUIDGenerator);

        dispatch(command:Object, metadata?:Dictionary<any>):Rx.IPromise<CommandResponse>;

        abstract canExecuteCommand(command:Object);

        abstract executeCommand(envelope:CommandEnvelope):Rx.IPromise<CommandResponse>;

        setNext(dispatcher:ICommandDispatcher):void;
    }

    class CommandEnvelope {
        id:string;
        type:string;
        createdTimestamp:string;
        metadata:Dictionary<any>;
        payload:Object;

        static of(payload:Object, metadata?:Dictionary<any>);
    }

    export interface IMetadataEnricher {
        enrich(command?:Object, metadata?:Dictionary<any>):Dictionary<any>
    }

    export enum DialogStatus {
        Confirmed,
        Rejected,
        Cancelled
    }

    export interface IDialogService extends IAlertService, IConfirmationService, ICustomDialogService {

    }

    export interface IAlertService {
        alert(message:string, title?:string):IPromise<DialogStatus>;
    }

    export interface IConfirmationService {
        confirm(message:string, title?:string):IPromise<DialogStatus>;
    }

    export interface ICustomDialogService {
        display(key:string, message:string, title?:string):IPromise<DialogStatus>;
    }

    export class SimpleDialogService implements IDialogService {

        alert(message:string, title?:string):Rx.IPromise<DialogStatus>;

        confirm(message:string, title?:string):Rx.IPromise<DialogStatus>;

        display(key:string, message:string, title?:string):Rx.IPromise<DialogStatus>;
    }

}

export = ninjagoat;