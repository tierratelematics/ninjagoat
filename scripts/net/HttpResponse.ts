import Dictionary from "../util/Dictionary";

class HttpResponse {
    constructor(public response:any, public headers?:Dictionary<string>) {

    }
}

export default HttpResponse