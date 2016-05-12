import {injectable, inject, INewable, IKernel} from "inversify";
import IObjectContainer from "./IObjectContainer";

@injectable()
export default class ObjectContainer implements IObjectContainer {

    constructor(@inject("IKernel") private kernel:IKernel) {
    }

    get<T>(key:string):T {
        return this.kernel.get<T>(key);
    }

    set<T>(key:string, object:INewable<T>, parent?:string) {
        if (!parent)
            this.kernel.bind<T>(key).to(object);
        else
            this.kernel.bind<T>(key).to(object).whenInjectedInto(parent);
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
