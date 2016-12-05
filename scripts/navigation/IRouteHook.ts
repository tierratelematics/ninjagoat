import RegistryEntry from "../registry/RegistryEntry";
import {RouterState} from "react-router";
import {RedirectFunction} from "react-router";
import * as Promise from "bluebird";

interface IRouteHook {
    enter(entry:RegistryEntry<any>, nextState:RouterState, replace:RedirectFunction):Promise<void>;
}

export default IRouteHook