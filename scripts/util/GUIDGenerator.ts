import IGUIDGenerator from "./IGUIDGenerator";
const uuid = require("uuid");
import {injectable} from "inversify";

@injectable()
class GUIDGenerator implements IGUIDGenerator {
    
    generate():string {
        return uuid.v4();
    }

}

export default GUIDGenerator