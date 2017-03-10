import ILogger from "./ILogger";
import LogLevel from "./LogLevel";

class ConsoleLogger implements ILogger {

    private logLevel = LogLevel.Debug;

    debug(message:string) {
        if (this.logLevel <= LogLevel.Debug)
            console.log(message);
    }

    info(message:string) {
        if (this.logLevel <= LogLevel.Info)
            console.info(message);
    }

    warning(message:string) {
        if (this.logLevel <= LogLevel.Warning)
            console.warn(message);
    }

    error(error:string|Error) {
        console.error(error);
    }

    setLogLevel(level:LogLevel) {
        this.logLevel = level;
    }
}

export default ConsoleLogger