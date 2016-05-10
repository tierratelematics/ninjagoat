import {IKernelModule, IKernel} from "inversify";
import IViewModelRegistry from "../registry/IViewModelRegistry";

interface IModule {
    modules:IKernelModule;
    register(kernel:IKernel, registry:IViewModelRegistry, overrides?:any):void;
}

export default IModule;
