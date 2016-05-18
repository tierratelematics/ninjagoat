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
import ICommandDispatcher from "../commands/ICommandDispatcher";
import CommandDispatcherEnricher from "../commands/CommandDispatcherEnricher";
import CommandDispatcher from "../commands/CommandDispatcher";
import PostCommandDispatcher from "../commands/PostCommandDispatcher";
import IMetadataEnricher from "../commands/IMetadataEnricher";
import EmptyMetadataEnricher from "../commands/EmptyMetadataEnricher";
import Dictionary from "../util/Dictionary";
import IDialogService from "../dialogs/IDialogService";
import SimpleDialogService from "../dialogs/SimpleDialogService";

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
        kernel.bind<ICommandDispatcher>("ICommandDispatcher").to(CommandDispatcherEnricher).inSingletonScope();
        kernel.bind<CommandDispatcher>("CommandDispatcher").to(PostCommandDispatcher).inSingletonScope().whenInjectedInto(CommandDispatcherEnricher);
        kernel.bind<IMetadataEnricher>("IMetadataEnricher").to(EmptyMetadataEnricher).inSingletonScope(); //Needed by inversify to resolve correctly the dependency graph
        kernel.bind<IDialogService>("IDialogService").to(SimpleDialogService).inSingletonScope();
    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {

    }
}

export default NinjaGoatModule;
