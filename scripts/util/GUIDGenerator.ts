import IGUIDGenerator from "./IGUIDGenerator";
import * as uuid from "uuid";

class GUIDGenerator implements IGUIDGenerator {
    
    generate():string {
        return uuid.v4();
    }

}

export default GUIDGenerator