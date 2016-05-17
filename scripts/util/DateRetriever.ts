import IDateRetriever from "./IDateRetriever";
import {injectable} from "inversify";

@injectable()
class DateRetriever implements IDateRetriever {
    
    getDate():string {
        return new Date().toISOString();
    }

}

export default DateRetriever