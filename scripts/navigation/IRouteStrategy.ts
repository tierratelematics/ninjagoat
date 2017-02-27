import RegistryEntry from "../registry/RegistryEntry";
import {RouterState} from "react-router";

interface IRouteStrategy {
    enter(entry:RegistryEntry<any>, nextState:RouterState):Promise<string>;
}

export default IRouteStrategy