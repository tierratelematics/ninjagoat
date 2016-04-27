interface Parser<T, T1> {
    parse(data: T): T1;
}

export default Parser;
