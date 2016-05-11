import {IKernelModule, IKernel} from "inversify";
import IViewModelRegistry from "../registry/IViewModelRegistry";

interface IModule {
    modules?:IKernelModule;
    register(registry:IViewModelRegistry, kernel?:IKernel, overrides?:any):void;
}

export default IModule;
