import IObjectContainer from "../../scripts/bootstrap/IObjectContainer";
import {interfaces} from "inversify";

export default class MockObjectContainer implements IObjectContainer {
    private dictionary:{ [id:string]:interfaces.Newable<any>|any } = {};

    get<T>(key:string, name?:string):T {
        return new this.dictionary[key]();
    }

    set<T>(key:string, object:interfaces.Newable<T>|T, parent?:string) {
        this.dictionary[key] = object;
    }

    contains(key:string):boolean {
        return this.dictionary.hasOwnProperty(key);
    }

    remove(key:string):void {
        delete this.dictionary[key];
    }
}