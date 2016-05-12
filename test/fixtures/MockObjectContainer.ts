import IObjectContainer from "../../scripts/bootstrap/IObjectContainer";
import INewable = inversify.INewable;

export default class MockObjectContainer implements IObjectContainer {
    private dictionary:{ [id:string]:INewable<any> } = {};

    get<T>(key:string):T {
        return new this.dictionary[key]();
    }

    set<T>(key:string, object:INewable<T>, parent?:string) {
        this.dictionary[key] = object;
    }

    contains(key:string):boolean {
        return this.dictionary.hasOwnProperty(key);
    }

    remove(key:string):void {
        delete this.dictionary[key];
    }
}