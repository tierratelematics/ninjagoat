import IViewModelRegistry from "./IViewModelRegistry";
import RegistryEntry from "./RegistryEntry";
import * as _ from "lodash";
import AreaRegistry from "./AreaRegistry";
import {injectable, INewable} from "inversify";
import IViewModel from "../viewmodels/IViewModel";
import ViewModelContext from "../registry/ViewModelContext";
import * as Rx from "rx";
import * as Area from "../constants/Area";

@injectable()
class ViewModelRegistry implements IViewModelRegistry {

    private registry: AreaRegistry[] = []; // Better than a Dictionary implementation since I can easy track case sensitive names
    private unregisteredEntries: RegistryEntry<any>[] = [];

    master<T>(construct: INewable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>): AreaRegistry {
        return this.add(construct, observable).forArea(Area.Master);
    }

    index<T>(construct:inversify.INewable<IViewModel<T>>, observable?:(context:ViewModelContext)=>Rx.IObservable<T>):AreaRegistry {
        return this.add(construct, observable).forArea(Area.Index);
    }

    add<T>(construct: INewable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>, parameters?: string): IViewModelRegistry {
        let id = Reflect.getMetadata("ninjagoat:viewmodel", construct);
        if (!id)
            throw new Error("Missing ViewModel decorator");
        this.unregisteredEntries.push(new RegistryEntry<T>(construct, id, observable, parameters));
        return this;
    }

    forArea(area: string): AreaRegistry {
        _.remove(this.registry, (entry: AreaRegistry) => entry.area === area);
        let areaRegistry = new AreaRegistry(area, this.unregisteredEntries);
        this.registry.push(areaRegistry);
        this.unregisteredEntries = [];
        return areaRegistry;
    }

    getArea(areaId: string): AreaRegistry {
        return _.find(this.registry, (entry: AreaRegistry) => entry.area.toLowerCase() === areaId.toLowerCase());
    }

    getAreas(): AreaRegistry[] {
        return this.registry;
    }

    getEntry<T extends IViewModel<U>, U>(area: string, id: string): RegistryEntry<T> {
        return _.find(this.getArea(area).entries, (entry: RegistryEntry<any>) => entry.id.toLowerCase() === id.toLowerCase());
    }
}

export default ViewModelRegistry;
