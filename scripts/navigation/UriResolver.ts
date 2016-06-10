import IUriResolver from "./IUriResolver";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import RegistryEntry from "../registry/RegistryEntry";
import * as _ from "lodash";
import {inject, injectable} from "inversify";
import * as Area from "../config/Area";

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

        area = _.capitalize(area);
        let entry:{ area:string, entry:RegistryEntry<T> } = null;
        if (!viewmodelId) {
            if (area === Area.Index || area === Area.Master)
                entry = {area: area, entry: <RegistryEntry<any>>this.registry.getArea(area).entries[0]};
            else {
                entry = this.getAreaViewModel<T>(area);
            }
        } else {
            entry = this.registry.getEntry<T>(area, viewmodelId);
            if (!entry.entry) //If viewmodel is undefined it means tha the second part of the uri is parameters, not the viemwodel id
                entry = this.getAreaViewModel<T>(area);
        }

        return {
            area: entry.area, viewmodel: entry.entry
        };
    }

    private getAreaViewModel<T>(area:string):{ area:string, entry:RegistryEntry<T> } {
        let specificIndexEntry = this.registry.getEntry<T>(area, `${area}${Area.Index}`);
        return specificIndexEntry.entry ? specificIndexEntry : this.registry.getEntry<T>(area, Area.Index);
    }
}

export default UriResolver;
