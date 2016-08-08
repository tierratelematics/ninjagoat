module.exports = {
    Foo: {
        Bar: require('./foo/Bar').default,
        FooIndex: require('./foo/FooIndex').default
    },
    Tools: {
        Bar: require('./foo/Bar').default,
        FooIndex: require('./foo/FooIndex').default
    },
    Index: require('./Index').default,
    Master: require('./Master').default,
    NotFound: require('./NotFound').default
};