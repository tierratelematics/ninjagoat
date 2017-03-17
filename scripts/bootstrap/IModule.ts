import {interfaces} from "inversify";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import IServiceLocator from "../ioc/IServiceLocator";

interface IModule {
    modules?:(container:interfaces.Container) => void;
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void;
}

export default IModule;
