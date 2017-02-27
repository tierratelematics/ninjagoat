import IRouteStrategy from "./IRouteStrategy";
import {injectable} from "inversify";
import RegistryEntry from "../registry/RegistryEntry";
import {RouterState} from "react-router";

@injectable()
class VoidRouteStrategy implements IRouteStrategy {

    enter(entry: RegistryEntry<any>, nextState: RouterState): Promise<string> {
        return Promise.resolve("");
    }
}

export default VoidRouteStrategy