interface ILogger {
    debug(message:string);

    info(message:string);

    warning(message:string);

    error(error:string|Error);
}

export default ILogger