/// <reference path="../typings/browser.d.ts" />

import {IKernelModule, INewable} from "inversify";
import * as Rx from "rx";
import * as React from "react";

declare module ninjagoat {

    export class Application {
        run(overrides?:any);

        register(module:IModule);
    }

    export interface IModule {
        modules:IKernelModule;
        register(registry:IViewModelRegistry, overrides?:any):void;
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
        context:string;
        parameters:any;
    }

    export interface IViewModel<T> extends Rx.IDisposable, Rx.IObservable<void> {
        "force nominal type for IViewModel":T;
    }

    export abstract class ObservableViewModel<T> implements IViewModel<T> {
        "force nominal type for IViewModel":T;

        subscribe(observer:Rx.IObserver<void>):Rx.IDisposable
        subscribe(onNext?:(value:void) => void, onError?:(exception:any) => void, onCompleted?:() => void):Rx.IDisposable;

        dispose():void
    }

    export abstract class View<T> extends React.Component<{ viewmodel:T }, {}> {
        public viewModel:T;
        abstract render();
    }

    export function ViewModel(name:string);

    export class Item<T> {
        state:ItemState;
        data:T;
        rejection:any;

        static Loading<T>():Item<T>;

        static Data<T>(data:T):Item<T>;

        static Error<T>(data:any):Item<T>;
    }

    export enum ItemState {
        Loading,
        Data,
        Error
    }

    interface ICommandDispatcher {
        dispatch(command:Command):void;
    }

    export class Command {

    }

    export interface CommandDecoratorsStatic {
        Authentication(type:Authentication)
        Endpoint(endpoint:string)
        Transport(type:Transport)
    }

    export var CommandDecorators:CommandDecoratorsStatic;

    export abstract class CommandDispatcher implements ICommandDispatcher {
        dispatch(command:Command):void;

        abstract internalExecute(command:Command):boolean;

        setNext(dispatcher:ICommandDispatcher):void;
    }

    export enum Authentication {
        Bearer,
        Basic
    }

    export enum Transport {
        HTTP_Post,
        WebSocket
    }

}

export = ninjagoat;