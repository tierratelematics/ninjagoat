import RegistryEntry from "../registry/RegistryEntry";
import {RouterState} from "react-router";
import * as Promise from "bluebird";

interface IRouteStrategy {
    enter(entry:RegistryEntry<any>, nextState:RouterState):Promise<string>;
}

export default IRouteStrategy