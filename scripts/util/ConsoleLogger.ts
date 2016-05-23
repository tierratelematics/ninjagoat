import ILogger from "./ILogger";

class ConsoleLogger implements ILogger {

    debug(message:string) {
        console.log(message);
    }

    info(message:string) {
        console.info(message);
    }

    warning(message:string) {
        console.warn(message);
    }

    error(error:string|Error) {
        console.error(error);
    }
}

export default ConsoleLogger