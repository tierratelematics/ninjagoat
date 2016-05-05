import {INewable} from "inversify";

interface IObjectContainer {
    get<T>(key: string): T;
    set<T>(key: string, object: INewable<T>);
    contains(key: string): boolean;
}

export default IObjectContainer;
