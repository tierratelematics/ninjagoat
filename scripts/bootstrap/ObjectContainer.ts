import {injectable, inject, INewable, IKernel} from "inversify";
import IObjectContainer from "./IObjectContainer";

@injectable()
export default class ObjectContainer implements IObjectContainer {

    constructor( @inject("IKernel") private kernel: IKernel) { }

    get<T>(key: string): T {
        return this.kernel.get<T>(key);
    }

    set<T>(key: string, object: INewable<T>) {
        this.kernel.bind<T>(key).to(object);
    }

    contains(key: string): boolean {
        try {
            this.kernel.get(key);
        } catch (e) {
            return false;
        }
        return true;
    }
}
