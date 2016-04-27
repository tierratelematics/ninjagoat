/// <reference path="../typings/browser.d.ts" />
import expect = require("expect.js");
import IViewResolver from "../scripts/views/IViewResolver";
import ViewResolver from "../scripts/views/ViewResolver";
import IViewModelRegistry from "../scripts/registry/IViewModelRegistry";
import ViewModelRegistry from "../scripts/registry/ViewModelRegistry";
import Bar from "./fixtures/views/foo/Bar";
import FooIndex from "./fixtures/views/foo/FooIndex";
import RootIndex from "./fixtures/views/Index";
import IndexViewModel from "./fixtures/viewmodels/IndexViewModel";
import BarViewModel from "./fixtures/viewmodels/BarViewModel";
import FooIndexViewModel from "./fixtures/viewmodels/FooIndexViewModel";

describe("ViewResolver,given a viewmodel identifier", () => {

    let subject: IViewResolver;
    let registry: IViewModelRegistry;

    beforeEach(() => {
        registry = new ViewModelRegistry();
        subject = new ViewResolver(require("./fixtures/views/export"));
        registry.root(IndexViewModel);
        registry.add(BarViewModel).add(FooIndexViewModel).forArea("Foo");
    });

    context("when it's registered under a specific area", () => {
        it("should return the correct view", () => {
            let view = subject.resolve<any>("Foo", "Bar");

            expect(view).to.be(Bar);
        });
    });

    context("when it's the root of an area", () => {
        it("should return the area index view", () => {
            let view = subject.resolve<any>("Foo");

            expect(view).to.be(FooIndex);
        });
    });

    context("when it's the application root", () => {
        it("should return the root view", () => {
            let view = subject.resolve<any>("Index");

            expect(view).to.be(RootIndex);
        });
    });
});
