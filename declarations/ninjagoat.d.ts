import {interfaces} from "inversify";
import * as Rx from "rx";
import * as React from "react";
import {PlainRoute} from "react-router";
import {RouterState} from "react-router";

export class Application {
    protected container: interfaces.Container;

    run(overrides?: any);

    boot(overrides?: any);

    register(module: IModule): boolean;

    protected rootComponent(): React.ReactElement<any>;
}

export let lazyInject:(serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>) => (proto: any, key: string) => void;

export interface Dictionary<T> {
    [index: string]: T
}

export interface IModule {
    modules?: (container: interfaces.Container) => void;
    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void;
}

export interface IServiceLocator {
    get<T>(key: string, name?: string): T;
}

export interface IObjectContainer extends IServiceLocator {
    set<T>(key: string, object: interfaces.Newable<T>|T, parent?: string);
    contains(key: string): boolean;
    remove(key: string): void;
}

export class ObjectContainer implements IObjectContainer {

    constructor(kernel: interfaces.Container);

    get<T>(key: string, name?: string): T;

    set<T>(key: string, object: interfaces.Newable<T>|T, parent?: string);

    contains(key: string): boolean;

    remove(key: string): void;
}

export interface IViewModelRegistry {
    master<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>): AreaRegistry;
    index<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>): AreaRegistry;
    notFound<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>): AreaRegistry;
    add<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>, parameters?: string): IViewModelRegistry;
    forArea(area: string): AreaRegistry;
    getArea(areaId: string): AreaRegistry;
    getAreas(): AreaRegistry[];
    getEntry<T>(area: string, id: string): {area: string, viewmodel: RegistryEntry<T>};
    getEntry<T>(construct: Function): {area: string, viewmodel: RegistryEntry<T>};
}

export class AreaRegistry {
    area: string;
    entries: RegistryEntry<IViewModel<any>>[];
}

export class RegistryEntry<T> {
    construct: interfaces.Newable<IViewModel<T>>;
    id: string;
    observableFactory: (context: ViewModelContext) => Rx.IObservable<T>;
    parameters: string;

    constructor(construct: interfaces.Newable<IViewModel<T>>,
                id: string,
                observableFactory: (context: ViewModelContext) => Rx.IObservable<T>,
                parameters: string);
}

export class ViewModelContext {
    area: string;
    viewmodelId: string;
    parameters: any;

    constructor(area: string, viewmodelId: string, parameters?: any);
}

export interface IViewModelFactory {
    create<T extends IViewModel<T>>(context: ViewModelContext, construct: interfaces.Newable<IViewModel<T>>,
                                    observableFactory: (context: ViewModelContext) => Rx.IObservable<T>): T;
}

export interface IViewModel<T> extends Rx.IDisposable, Rx.IObservable<void> {
    "force nominal type for IViewModel": T;
}

export abstract class ObservableViewModel<T> implements IViewModel<T> {
    "force nominal type for IViewModel": T;

    observe(observable: Rx.IObservable<T>);

    protected abstract onData(data: T): void;

    subscribe(observer: Rx.IObserver<void>): Rx.IDisposable
    subscribe(onNext?: (value: void) => void, onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable;

    dispose(): void
}

export abstract class View<T> extends React.Component<{viewmodel: T}, {}> {
    public viewModel: T;

    abstract render();
}

export function ViewModel(name: string);

export class ViewModelUtil {
    static getViewModelName(viewModel: Function): string;
}

export function Presentation(name: string);

export function Refresh(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>);

export interface IHttpClient {
    get(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse>
    post(url: string, body: any, headers?: Dictionary<string>): Rx.Observable<HttpResponse>
    put(url: string, body: any, headers?: Dictionary<string>): Rx.Observable<HttpResponse>
    delete(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse>
}

export class HttpClient implements IHttpClient {

    get(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse>;

    post(url: string, body: {}|FormData, headers?: Dictionary<string>): Rx.Observable<HttpResponse>;

    put(url: string, body: {}, headers?: Dictionary<string>): Rx.Observable<HttpResponse>;

    delete(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse>;
}

export class HttpResponse {
    response: any;
    status: number;
    headers: Dictionary<string>;

    constructor(response: any, status: number, headers?: Dictionary<string>);
}

export interface IDateRetriever {
    getDate(): string;
}

export interface IGUIDGenerator {
    generate(): string;
}

export interface ILogger {
    debug(message: string);

    info(message: string);

    warning(message: string);

    error(error: string|Error);

    setLogLevel(level: LogLevel);
}

export enum LogLevel {
    Debug,
    Info,
    Warning,
    Error
}

export interface IComponentFactory {
    componentForMaster<T>(): React.ClassicComponentClass<T>;
    componentForUri<T>(uri: string): React.ClassicComponentClass<T>;
    componentForNotFound<T>(): React.ClassicComponentClass<T>;
}

export class ComponentFactory implements IComponentFactory {

    constructor(contextFactory: IContextFactory);

    componentForMaster<T>(): React.ClassicComponentClass<any>;

    componentForUri<T>(uri: string): React.ClassicComponentClass<any>;

    componentForNotFound<T>(): React.ClassicComponentClass<T>;
}

export interface IContextFactory {
    contextFor<T extends IViewModel<any>>(uri: string, parameters?: any): {view: interfaces.Newable<View<T>>, viewmodel: T};
}

export interface INavigationManager {
    navigate(area: string, viewmodelId?: string, parameters?: Dictionary<any>): void;
    replace(area: string, viewmodelId?: string, parameters?: Dictionary<any>): void;
    getNavigationPath(area: string, viewmodelId?: string, parameters?: Dictionary<any>): string;
}

export interface ILocationHandler {
    changeLocation(url: string);
    replaceLocation(url: string);
}

export interface IRouteStrategy {
    enter(entry: RegistryEntry<any>, nextState: RouterState): Promise<string>;
}

export class VoidRouteStrategy implements IRouteStrategy {

    enter(entry: RegistryEntry<any>, nextState: RouterState): Promise<string>;
}

export interface ISettingsManager {
    getValue<T>(key: string, fallback?: T): T;
    setValue<T>(key: string, value: T): void;
}

export interface ISettingsManagerAsync {
    getValueAsync<T>(key: string, fallback?: T): Promise<T>;
    setValueAsync<T>(key: string, value: T): Promise<void>;
}

export interface IUriResolver {
    resolve<T>(uri: string): {area: string, viewmodel: RegistryEntry<T>};
}

export interface ILocationListener {
    pushLocation(location: string): void;
    changes(): Rx.Observable<{area: string, viewmodel: RegistryEntry<any>}>;
}

export abstract class PresentationViewModel<T> extends ObservableViewModel<T> {
    public presentation: string;

    constructor(locationListener: ILocationListener);

    protected updatePresentation(presentation: string);
}

export interface IRoutingAdapter {
    routes(): PlainRoute;
}

export function FeatureToggle(predicate: CheckPredicate);

export interface CheckPredicate {
    (): boolean
}

export interface IFeatureChecker {
    check(feature: any): boolean;
    canCheck(feature: any): boolean;
}

export class FeatureChecker implements IFeatureChecker {
    check(feature: any): boolean;

    canCheck(feature: any): boolean;
}

interface PredicatesStatic {
    always(): boolean;
    never(): boolean;
    environment(environments: string[]): () => boolean;
    version(version: string): () => boolean;
    compose(p1: CheckPredicate, p2: CheckPredicate): () => boolean;
    negate(predicate: CheckPredicate): () => boolean;
}

export var FeaturePredicates: PredicatesStatic;