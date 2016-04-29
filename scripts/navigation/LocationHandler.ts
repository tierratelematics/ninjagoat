import ILocationHandler from "./ILocationHandler";
import { browserHistory } from "react-router";

class LocationHandler implements ILocationHandler {

    changeLocation(url: string) {
        browserHistory.push(url);
    }
}

export default LocationHandler;
