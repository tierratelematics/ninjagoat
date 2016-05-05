import IUriResolver from "./IUriResolver";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import RegistryEntry from "../registry/RegistryEntry";
import * as _ from "lodash";
import {inject, injectable} from "inversify";
import * as Area from "../constants/Area";

@injectable()
class UriResolver implements IUriResolver {

    constructor( @inject("IViewModelRegistry") private registry: IViewModelRegistry) {
    }

    resolve<T>(uri: string): { area: string, viewmodel: RegistryEntry<T> } {
        let uriParts: string[] = _.compact(uri.split("?")[0].split("/"));
        let area: string = uriParts[0];
        let viewmodelId: string = uriParts[1];

        if (!area)
            area = Area.Index; // If area doesn't exists it means I am in "/"

        area = _.capitalize(area);
        let viewmodel: RegistryEntry<T> = null;
        if (!viewmodelId) {
            if (area === Area.Index || area === Area.Master)
                viewmodel = <RegistryEntry<any>>this.registry.getArea(area).entries[0];
            else {
                let specificIndexEntry = this.registry.getEntry<T>(area, `${area}${Area.Index}`);
                viewmodel = specificIndexEntry ? specificIndexEntry : this.registry.getEntry<T>(area, Area.Index);
            }
        } else
            viewmodel = this.registry.getEntry<T>(area, viewmodelId);

        return {
            area: area, viewmodel: <RegistryEntry<T>>viewmodel
        };
    }
}

export default UriResolver;
