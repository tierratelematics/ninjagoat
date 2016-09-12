import ILocationHandler from "./ILocationHandler";
import { browserHistory } from "react-router";
import {injectable} from "inversify";

@injectable()
class LocationHandler implements ILocationHandler {

    changeLocation(url: string) {
        browserHistory.push(url);
    }

    replaceLocation(url: string) {
        browserHistory.replace(url);
    }
}

export default LocationHandler;
