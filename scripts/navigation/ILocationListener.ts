import RegistryEntry from "../registry/RegistryEntry";
import {Observable} from "rxjs";

interface ILocationListener {
    pushLocation(location: string): void;
    changes(): Observable<{ area: string, viewmodel: RegistryEntry<any> }>;
}

export default ILocationListener;
