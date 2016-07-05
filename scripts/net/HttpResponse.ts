import Dictionary from "../util/Dictionary";

class HttpResponse {
    constructor(public response:any, public status:number, public headers?:Dictionary<string>) {

    }
}

export default HttpResponse