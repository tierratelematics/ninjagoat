import IModule from "./IModule";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import {interfaces} from "inversify";
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
import IObjectContainer from "../ioc/IObjectContainer";
import ObjectContainer from "../ioc/ObjectContainer";
import IComponentFactory from "../components/IComponentFactory";
import ComponentFactory from "../components/ComponentFactory";
import IHttpClient from "../net/IHttpClient";
import HttpClient from "../net/HttpClient";
import ISerializer from "../io/ISerializer";
import QuerySerializer from "../io/QuerySerializer";
import IServiceLocator from "../ioc/IServiceLocator";
import IDateRetriever from "../util/IDateRetriever";
import DateRetriever from "../util/DateRetriever";
import GUIDGenerator from "../util/GUIDGenerator";
import IGUIDGenerator from "../util/IGUIDGenerator";
import Dictionary from "../util/Dictionary";
import ConsoleLogger from "../log/ConsoleLogger";
import ILogger from "../log/ILogger";
import INavigationManager from "../navigation/INavigationManager";
import NavigationManager from "../navigation/NavigationManager";
import ILocationHandler from "../navigation/ILocationHandler";
import LocationHandler from "../navigation/LocationHandler";
import ISettingsManager from "../io/ISettingsManager";
import StorageSettingsManager from "../io/StorageSettingsManager";
import ILocationListener from "../navigation/ILocationListener";
import LocationListener from "../navigation/LocationListener";
import IRouteStrategy from "../navigation/IRouteStrategy";
import VoidRouteStrategy from "../navigation/VoidRouteStrategy";

class NinjaGoatModule implements IModule {

    modules = (container:interfaces.Container) => {
        container.bind<interfaces.Container>("Container").toConstantValue(container);
        container.bind<IObjectContainer>("IObjectContainer").to(ObjectContainer).inSingletonScope();
        container.bind<IViewModelRegistry>("IViewModelRegistry").to(ViewModelRegistry).inSingletonScope();
        container.bind<IObservableFactory>("IObservableFactory").to(ObservableFactory).inSingletonScope();
        container.bind<IUriResolver>("IUriResolver").to(UriResolver).inSingletonScope();
        container.bind<IViewResolver>("IViewResolver").to(ViewResolver).inSingletonScope();
        container.bind<IContextFactory>("IContextFactory").to(ContextFactory).inSingletonScope();
        container.bind<IComponentFactory>("IComponentFactory").to(ComponentFactory).inSingletonScope();
        container.bind<IRoutingAdapter>("IRoutingAdapter").to(RoutingAdapter).inSingletonScope();
        container.bind<IViewModelFactory>("IViewModelFactory").to(ViewModelFactory).inSingletonScope();
        container.bind<IHttpClient>("IHttpClient").to(HttpClient).inSingletonScope();
        container.bind<ISerializer<Dictionary<string>, string>>("QuerySerializer").to(QuerySerializer).inSingletonScope();
        container.bind<IDateRetriever>("IDateRetriever").to(DateRetriever).inSingletonScope();
        container.bind<IGUIDGenerator>("IGUIDGenerator").to(GUIDGenerator).inSingletonScope();
        container.bind<ILogger>("ILogger").to(ConsoleLogger).inSingletonScope();
        container.bind<INavigationManager>("INavigationManager").to(NavigationManager).inSingletonScope();
        container.bind<ILocationHandler>("ILocationHandler").to(LocationHandler).inSingletonScope();
        container.bind<ISettingsManager>("ISettingsManager").to(StorageSettingsManager).inSingletonScope();
        container.bind<ILocationListener>("ILocationListener").to(LocationListener).inSingletonScope();
        container.bind<IRouteStrategy>("IRouteStrategy").to(VoidRouteStrategy).inSingletonScope();
    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {

    }
}

export default NinjaGoatModule;
