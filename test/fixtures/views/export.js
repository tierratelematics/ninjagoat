module.exports = {
    Foo: {
        Bar: require('./foo/Bar').default,
        FooIndex: require('./foo/FooIndex').default
    },
    Index: require('./Index').default
};