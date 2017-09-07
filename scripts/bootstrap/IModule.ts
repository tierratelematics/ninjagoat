import {interfaces} from "inversify";
import IServiceLocator from "../ioc/IServiceLocator";
import {IViewModelRegistry} from "../registry/IViewModelRegistry";

interface IModule {
    modules?:(container:interfaces.Container) => void;
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void;
}

export default IModule;
