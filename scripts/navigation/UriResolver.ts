import IUriResolver from "./IUriResolver";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import RegistryEntry from "../registry/RegistryEntry";
import * as _ from "lodash";
import {inject, injectable} from "inversify";

@injectable()
class UriResolver implements IUriResolver {

    constructor( @inject("IViewModelRegistry") private registry: IViewModelRegistry) {
    }

    resolve<T>(uri: string): { area: string, viewmodel: RegistryEntry<T> } {
        let uriParts: string[] = _.compact(uri.split("/"));
        let area: string = uriParts[0];
        let viewmodelId: string = uriParts[1];

        if (!area)
            area = "Index"; // If area doesn't exists it means I am in "/"

        area = _.capitalize(area);
        let viewmodel: RegistryEntry<T> = null;
        if (!viewmodelId) {
            if (area === "Index")
                viewmodel = <RegistryEntry<any>>this.registry.getArea(area).entries[0];
            else {
                let specificIndexEntry = this.registry.getEntry<T>(area, `${area}Index`);
                viewmodel = specificIndexEntry ? specificIndexEntry : this.registry.getEntry<T>(area, "Index");
            }
        } else
            viewmodel = this.registry.getEntry<T>(area, viewmodelId);

        return {
            area: area, viewmodel: <RegistryEntry<T>>viewmodel
        };
    }
}

export default UriResolver;
