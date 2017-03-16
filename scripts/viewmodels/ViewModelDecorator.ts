import {injectable, decorate} from "inversify";

export function ViewModel(name: string) {
    return function (target: any) {
        decorate(injectable(), target);
        Reflect.defineMetadata("ninjagoat:viewmodel", name, target);
        return target;
    };
}

export class ViewModelUtil {
    static getViewModelName(viewModel: Function): string {
        return Reflect.getMetadata("ninjagoat:viewmodel", viewModel);
    }
}
