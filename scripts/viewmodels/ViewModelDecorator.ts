import {injectable, decorate} from "inversify";

function ViewModel(name:string) {
    return function (target:any) {
        decorate(injectable(), target);
        Reflect.defineMetadata("ninjagoat:viewmodel", name, target);
        return target;
    };
}

export default ViewModel;