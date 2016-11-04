import FeatureToggle from "../../scripts/feature-toggle/FeatureToggleDecorator";
import {always, never} from "../../scripts/feature-toggle/Checks";
import IModule from "../../scripts/bootstrap/IModule";
import IViewModelRegistry from "../../scripts/registry/IViewModelRegistry";
import IServiceLocator from "../../scripts/bootstrap/IServiceLocator";

@FeatureToggle(always)
export class ValidModule implements IModule {
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
    }

}

@FeatureToggle(never)
export class DisabledModule implements IModule {
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
    }
}

export class WithoutFTModule implements IModule {
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
    }
}