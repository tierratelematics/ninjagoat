import IGUIDGenerator from "./IGUIDGenerator";
import * as uuid from "uuid";
import {injectable} from "inversify";

@injectable()
class GUIDGenerator implements IGUIDGenerator {
    
    generate():string {
        return uuid.v4();
    }

}

export default GUIDGenerator