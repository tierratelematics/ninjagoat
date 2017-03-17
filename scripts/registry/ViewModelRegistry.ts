import IViewModelRegistry from "./IViewModelRegistry";
import RegistryEntry from "./RegistryEntry";
import * as _ from "lodash";
import AreaRegistry from "./AreaRegistry";
import {injectable, interfaces} from "inversify";
import IViewModel from "../viewmodels/IViewModel";
import ViewModelContext from "../registry/ViewModelContext";
import * as Rx from "rx";
import * as Area from "./Area";
import {ViewModelUtil} from "../viewmodels/ViewModelDecorator";

@injectable()
class ViewModelRegistry implements IViewModelRegistry {

    private registry: AreaRegistry[] = []; // Better than a Dictionary implementation since I can easy track case sensitive names
    private unregisteredEntries: RegistryEntry<any>[] = [];

    master<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>): AreaRegistry {
        return this.add(construct, observable).forArea(Area.Master);
    }

    index<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>): AreaRegistry {
        return this.add(construct, observable).forArea(Area.Index);
    }

    notFound<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>): AreaRegistry {
        return this.add(construct, observable).forArea(Area.NotFound);
    }

    add<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>, parameters?: string): IViewModelRegistry {
        let id = ViewModelUtil.getViewModelName(construct);
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

    getEntry<T>(area: string, id: string): {area: string, viewmodel: RegistryEntry<T>};
    getEntry<T>(construct: Function): {area: string; viewmodel: RegistryEntry<T>};
    getEntry<T>(param: string|Function, id?: string): {area: string, viewmodel: RegistryEntry<T>} {
        if (isArea(param)) {
            let areaRegistry = this.getArea(param);
            return {
                area: areaRegistry.area,
                viewmodel: _.find(areaRegistry.entries, (entry: RegistryEntry<any>) => entry.id.toLowerCase() === id.toLowerCase())
            }
        } else {
            let item = null;
            _.forEach(this.getAreas(), areaRegistry => {
                let entry = _.find(areaRegistry.entries, entry => entry.construct === param);
                if (entry) item = {
                    area: areaRegistry.area,
                    viewmodel: entry
                }
            });
            return item;
        }
    }
}

function isArea(param: string|Function): param is string {
    return typeof param === "string";
}

export default ViewModelRegistry;
