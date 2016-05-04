import IModule from "./IModule";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import {IKernelModule} from "inversify";
import IKernel = inversify.IKernel;
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

class NinjaGoatModule implements IModule {

    modules: IKernelModule = (kernel: IKernel) => {
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
    };

    register(registry: IViewModelRegistry, overrides?: any): void {
    }
}

export default NinjaGoatModule;
