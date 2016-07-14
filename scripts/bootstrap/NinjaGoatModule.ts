import IModule from "./IModule";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import {IKernelModule, IKernel} from "inversify";
import ViewModelRegistry from "../registry/ViewModelRegistry";
import IObservableFactory from "../viewmodels/IObservableFactory";
import ObservableFactory from "../viewmodels/ObservableFactory";
import IUriResolver from "../navigation/IUriResolver";
import UriResolver from "../navigation/UriResolver";
import IViewResolver from "../views/IViewResolver";
import ViewResolver from "../views/ViewResolver";
import IContextFactory from "../components/IContextFactory";
import ContextFactory from "../components/ContextFactory";
import IRoutingAdapter from "../navigation/IRoutingAdapter";
import RoutingAdapter from "../navigation/RoutingAdapter";
import IViewModelFactory from "../viewmodels/IViewModelFactory";
import ViewModelFactory from "../viewmodels/ViewModelFactory";
import IObjectContainer from "./IObjectContainer";
import ObjectContainer from "./ObjectContainer";
import IComponentFactory from "../components/IComponentFactory";
import ComponentFactory from "../components/ComponentFactory";
import IHttpClient from "../net/IHttpClient";
import HttpClient from "../net/HttpClient";
import ISerializer from "../io/ISerializer";
import QuerySerializer from "../io/QuerySerializer";
import IServiceLocator from "./IServiceLocator";
import IDateRetriever from "../util/IDateRetriever";
import DateRetriever from "../util/DateRetriever";
import GUIDGenerator from "../util/GUIDGenerator";
import IGUIDGenerator from "../util/IGUIDGenerator";
import Dictionary from "../util/Dictionary";
import ConsoleLogger from "../util/ConsoleLogger";
import ILogger from "../util/ILogger";
import INavigationManager from "../navigation/INavigationManager";
import NavigationManager from "../navigation/NavigationManager";
import ILocationHandler from "../navigation/ILocationHandler";
import LocationHandler from "../navigation/LocationHandler";
import ISettingsManager from "../io/ISettingsManager";
import StorageSettingsManager from "../io/StorageSettingsManager";

class NinjaGoatModule implements IModule {

    modules:IKernelModule = (kernel:IKernel) => {
        kernel.bind<IKernel>("IKernel").toConstantValue(kernel);
        kernel.bind<IObjectContainer>("IObjectContainer").to(ObjectContainer).inSingletonScope();
        kernel.bind<IViewModelRegistry>("IViewModelRegistry").to(ViewModelRegistry).inSingletonScope();
        kernel.bind<IObservableFactory>("IObservableFactory").to(ObservableFactory).inSingletonScope();
        kernel.bind<IUriResolver>("IUriResolver").to(UriResolver).inSingletonScope();
        kernel.bind<IViewResolver>("IViewResolver").to(ViewResolver).inSingletonScope();
        kernel.bind<IContextFactory>("IContextFactory").to(ContextFactory).inSingletonScope();
        kernel.bind<IComponentFactory>("IComponentFactory").to(ComponentFactory).inSingletonScope();
        kernel.bind<IRoutingAdapter>("IRoutingAdapter").to(RoutingAdapter).inSingletonScope();
        kernel.bind<IViewModelFactory>("IViewModelFactory").to(ViewModelFactory).inSingletonScope();
        kernel.bind<IHttpClient>("IHttpClient").to(HttpClient).inSingletonScope();
        kernel.bind<ISerializer<Dictionary<string>, string>>("ISerializer").to(QuerySerializer).inSingletonScope();
        kernel.bind<IDateRetriever>("IDateRetriever").to(DateRetriever).inSingletonScope();
        kernel.bind<IGUIDGenerator>("IGUIDGenerator").to(GUIDGenerator).inSingletonScope();
        kernel.bind<ILogger>("ILogger").to(ConsoleLogger).inSingletonScope();
        kernel.bind<INavigationManager>("INavigationManager").to(NavigationManager).inSingletonScope();
        kernel.bind<ILocationHandler>("ILocationHandler").to(LocationHandler).inSingletonScope();
        kernel.bind<ISettingsManager>("ISettingsManager").to(StorageSettingsManager).inSingletonScope();
    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {

    }
}

export default NinjaGoatModule;
