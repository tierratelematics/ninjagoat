interface IParser<T, T1> {
    parse(data: T): T1;
}

export default IParser;
