import "reflect-metadata";
import expect = require("expect.js");
import IViewResolver from "../scripts/views/IViewResolver";
import ViewResolver from "../scripts/views/ViewResolver";
import Bar from "./fixtures/views/foo/Bar";
import FooIndex from "./fixtures/views/foo/FooIndex";
import RootIndex from "./fixtures/views/Index";
import MasterView from "./fixtures/views/Master";
import * as Area from "../scripts/registry/Area";
import NotFound from "./fixtures/views/NotFound";

describe("ViewResolver,given a viewmodel identifier", () => {

    let subject:IViewResolver;

    beforeEach(() => {
        subject = new ViewResolver(require("./fixtures/views/export"));
    });

    context("when it's registered under a specific area", () => {
        it("should return the correct view", () => {
            let view = subject.resolve<any>("Foo", "Bar");

            expect(view).to.be(Bar);
        });

        context("and the area is lowercase", () => {
            it("should return the correct view", () => {
                let view = subject.resolve<any>("tools", "Bar");

                expect(view).to.be(Bar);
            })
        });
    });

    context("when a view that is not registered needs to be resolved", () => {
        it("should return a null result", () => {
            let view = subject.resolve<any>("Inexistent");

            expect(view).to.be(null);
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

    context("when it's the master application container", () => {
        it("should return the master view", () => {
            let view = subject.resolve<any>(Area.Master);

            expect(view).to.be(MasterView);
        });
    });

    context("when a page is not found", () => {
        it("should the not found view", () => {
            let view = subject.resolve<any>(Area.NotFound);

            expect(view).to.be(NotFound);
        });
    });
});
