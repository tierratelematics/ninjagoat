import FeatureToggle from "../../scripts/feature-toggle/FeatureToggleDecorator";
import {enabled, disabled} from "../../scripts/feature-toggle/Validations";
import IModule from "../../scripts/bootstrap/IModule";
import IViewModelRegistry from "../../scripts/registry/IViewModelRegistry";
import IServiceLocator from "../../scripts/bootstrap/IServiceLocator";

@FeatureToggle(enabled)
export class ValidModule implements IModule {
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
    }

}

@FeatureToggle(disabled)
export class DisabledModule implements IModule {
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
    }
}

export class WithoutFTModule implements IModule {
    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
    }
}