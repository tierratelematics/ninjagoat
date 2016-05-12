import {INewable} from "inversify";
import IServiceLocator from "./IServiceLocator";

interface IObjectContainer extends IServiceLocator {
    set<T>(key:string, object:INewable<T>, parent?:string);
    contains(key:string):boolean;
    remove(key:string):void;
}

export default IObjectContainer;
