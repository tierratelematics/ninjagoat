import {interfaces} from "inversify";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import IServiceLocator from "./IServiceLocator";

interface IModule {
    modules?:(Kernel:interfaces.Kernel) => void;
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void;
}

export default IModule;
