import {interfaces} from "inversify";
import IServiceLocator from "../ioc/IServiceLocator";
import {IViewModelRegistrySetter} from "../registry/IViewModelRegistry";

interface IModule {
    modules?: (container: interfaces.Container) => void;

    register(registry: IViewModelRegistrySetter, serviceLocator?: IServiceLocator, overrides?: any): void;
}

export default IModule;
