import IUriResolver from "./IUriResolver";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import RegistryEntry from "../registry/RegistryEntry";
import * as _ from "lodash";
import {inject, injectable} from "inversify";
import * as Area from "../registry/Area";

@injectable()
class UriResolver implements IUriResolver {

    constructor(@inject("IViewModelRegistry") private registry:IViewModelRegistry) {
    }

    resolve<T>(uri:string):{ area:string, viewmodel:RegistryEntry<T> } {
        let uriParts:string[] = _.compact(uri.split("?")[0].split("/"));
        let area:string = uriParts[0];
        let viewmodelId:string = uriParts[1];

        if (!area)
            area = Area.Index; // If area doesn't exists it means I am in "/"

        let entry:{ area:string, viewmodel:RegistryEntry<T> } = null;
        let areaRegistry = this.registry.getArea(area);
        if (!areaRegistry) {
            return {
                area: Area.NotFound,
                viewmodel: <RegistryEntry<any>>this.registry.getArea(Area.NotFound).entries[0]
            };
        }
        if (!viewmodelId) {
            if (area === Area.Index || area === Area.Master || area === Area.NotFound)
                entry = {area: area, viewmodel: <RegistryEntry<any>>this.registry.getArea(area).entries[0]};
            else
                entry = this.getAreaViewModel<T>(area);
        } else {
            entry = this.registry.getEntry<T>(area, viewmodelId);
            if (!entry.viewmodel) {//If viewmodel is undefined it means that the second part of the uri is parameters, not the viemwodel id
                entry = this.getAreaViewModel<T>(area);
                if (!entry.viewmodel)
                    entry = {
                        area: Area.NotFound,
                        viewmodel: <RegistryEntry<any>>this.registry.getArea(Area.NotFound).entries[0]
                    };
            }
        }

        return entry;
    }

    private getAreaViewModel<T>(area:string):{ area:string, viewmodel:RegistryEntry<T> } {
        let specificIndexEntry = this.registry.getEntry<T>(area, `${area}${Area.Index}`);
        return specificIndexEntry.viewmodel ? specificIndexEntry : this.registry.getEntry<T>(area, Area.Index);
    }
}

export default UriResolver;
