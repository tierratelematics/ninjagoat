import {Observable} from "rx";
import RegistryEntry from "../registry/RegistryEntry";

interface ILocationListener {
    pushLocation(location:string):void;
    changes():Observable<{ area:string, viewmodel:RegistryEntry<any> }>;
}

export default ILocationListener