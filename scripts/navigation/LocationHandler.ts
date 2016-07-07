import ILocationHandler from "./ILocationHandler";
import { browserHistory } from "react-router";
import {injectable} from "inversify";

@injectable()
class LocationHandler implements ILocationHandler {

    changeLocation(url: string) {
        browserHistory.push(url);
    }
}

export default LocationHandler;
