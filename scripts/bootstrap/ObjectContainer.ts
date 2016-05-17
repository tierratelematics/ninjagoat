import {injectable, inject, INewable, IKernel} from "inversify";
import IObjectContainer from "./IObjectContainer";
import * as _ from "lodash";

@injectable()
export default class ObjectContainer implements IObjectContainer {

    constructor(@inject("IKernel") private kernel:IKernel) {
    }

    get<T>(key:string, name?:string):T {
        return !name ? this.kernel.get<T>(key) : this.kernel.getNamed<T>(key, name);
    }

    set<T>(key:string, object:INewable<T>|T, parent?:string) {
        let binding = _.isFunction(object)
            ? this.kernel.bind<T>(key).to(object)
            : this.kernel.bind<T>(key).toConstantValue(object);
        if (parent)
            binding.whenInjectedInto(parent);
    }

    contains(key:string):boolean {
        try {
            this.kernel.get(key);
        } catch (e) {
            return false;
        }
        return true;
    }

    remove(key:string):void {
        this.kernel.unbind(key);
    }
}
