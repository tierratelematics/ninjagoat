import IDateRetriever from "./IDateRetriever";

class DateRetriever implements IDateRetriever {
    
    getDate():string {
        return new Date().toISOString();
    }

}

export default DateRetriever