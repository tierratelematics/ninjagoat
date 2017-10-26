import {IViewModelRegistry} from "./IViewModelRegistry";
import RegistryEntry from "./RegistryEntry";
import * as _ from "lodash";
import AreaRegistry from "./AreaRegistry";
import {injectable} from "inversify";
import * as Area from "./Area";
import {ViewModelUtil} from "../viewmodels/ViewModelDecorator";

@injectable()
class ViewModelRegistry implements IViewModelRegistry {

    private registry: AreaRegistry[] = []; // Better than a Dictionary implementation since I can easy track case sensitive names
    private unregisteredEntries: RegistryEntry[] = [];

    master<T>(entry: RegistryEntry<T>): AreaRegistry {
        return this.add(entry).forArea(Area.Master);
    }

    index<T>(entry: RegistryEntry<T>): AreaRegistry {
        return this.add(entry).forArea(Area.Index);
    }

    notFound<T>(entry: RegistryEntry<T>): AreaRegistry {
        return this.add(entry).forArea(Area.NotFound);
    }

    add<T>(entry: RegistryEntry<T>): IViewModelRegistry {
        let id = ViewModelUtil.getViewModelName(entry.construct);
        if (!id)
            throw new Error("Missing ViewModel decorator");
        entry.id = id;
        this.unregisteredEntries.push(entry);
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

    getEntry<T>(area: string, id: string): { area: string, viewmodel: RegistryEntry<T> };
    getEntry<T>(construct: Function): { area: string; viewmodel: RegistryEntry<T> };
    getEntry<T>(param: string | Function, id?: string): { area: string, viewmodel: RegistryEntry<T> } {
        if (isArea(param)) {
            let areaRegistry = this.getArea(param);
            if (!areaRegistry) {
                return {area: null, viewmodel: null};
            }
            return {
                area: areaRegistry.area,
                viewmodel: _.find(areaRegistry.entries, (entry: RegistryEntry) => entry.id.toLowerCase() === id.toLowerCase())
            };
        } else {
            let item = null;
            _.forEach(this.getAreas(), areaRegistry => {
                let entry = _.find(areaRegistry.entries, entry => entry.construct === param);
                if (entry) item = {
                    area: areaRegistry.area,
                    viewmodel: entry
                };
            });
            return item;
        }
    }
}

function isArea(param: string | Function): param is string {
    return typeof param === "string";
}

export default ViewModelRegistry;
