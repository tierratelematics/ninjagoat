import LogLevel from "./LogLevel";

interface ILogger {
    debug(message:string);

    info(message:string);

    warning(message:string);

    error(error:string|Error);

    setLogLevel(level:LogLevel);
}

export default ILogger