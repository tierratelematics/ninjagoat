import {Predicates, FeatureToggle} from "bivio";
import IModule from "../../scripts/bootstrap/IModule";
import IViewModelRegistry from "../../scripts/registry/IViewModelRegistry";
import IServiceLocator from "../../scripts/ioc/IServiceLocator";

@FeatureToggle(Predicates.always)
export class ValidModule implements IModule {
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
    }

}

@FeatureToggle(Predicates.never)
export class DisabledModule implements IModule {
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
    }
}

export class WithoutFTModule implements IModule {
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
    }
}