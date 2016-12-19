import {injectable, inject, interfaces} from "inversify";
import IObjectContainer from "./IObjectContainer";
import * as _ from "lodash";

@injectable()
export default class ObjectContainer implements IObjectContainer {

    constructor(@inject("Container") private container:interfaces.Container) {
    }

    get<T>(key:string, name?:string):T {
        return !name ? this.container.get<T>(key) : this.container.getNamed<T>(key, name);
    }

    set<T>(key:string, object:interfaces.Newable<T>|T, parent?:string) {
        let binding = _.isFunction(object)
            ? this.container.bind<T>(key).to(object)
            : this.container.bind<T>(key).toConstantValue(object);
        if (parent)
            binding.whenInjectedInto(parent);
    }

    contains(key:string):boolean {
        try {
            this.container.get(key);
        } catch (e) {
            return false;
        }
        return true;
    }

    remove(key:string):void {
        this.container.unbind(key);
    }
}
