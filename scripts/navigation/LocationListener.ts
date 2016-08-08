import ILocationListener from "./ILocationListener";
import RegistryEntry from "../registry/RegistryEntry";
import {Subject, Observable, ReplaySubject} from "rx";
import {inject, injectable} from "inversify";
import IUriResolver from "./IUriResolver";

@injectable()
class LocationListener implements ILocationListener {
    private subject:Subject<string> = new ReplaySubject<string>(1);

    constructor(@inject("IUriResolver") private uriResolver:IUriResolver) {

    }

    pushLocation(location:string):void {
        this.subject.onNext(location);
    }

    changes():Observable<{ area:string, viewmodel:RegistryEntry<any> }> {
        return this.subject.map(location => this.uriResolver.resolve(location));
    }

}

export default LocationListener