import HttpHeaders from "./HttpHeaders";

class HttpResponse {
    constructor(public response:any, public headers?:HttpHeaders) {

    }
}

export default HttpResponse