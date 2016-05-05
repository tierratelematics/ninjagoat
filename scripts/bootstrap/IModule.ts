import {IKernelModule} from "inversify";
import IViewModelRegistry from "../registry/IViewModelRegistry";

interface IModule {
    modules: IKernelModule;
    register(registry: IViewModelRegistry, overrides?: any): void;
}

export default IModule;
