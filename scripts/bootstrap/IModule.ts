import {IKernelModule, IKernel} from "inversify";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import IServiceLocator from "./IServiceLocator";

interface IModule {
    modules?:IKernelModule;
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void;
}

export default IModule;
