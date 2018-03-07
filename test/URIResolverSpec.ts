import "reflect-metadata";
import expect = require("expect.js");
import ViewModelRegistry from "../scripts/registry/ViewModelRegistry";
import {IViewModelRegistry} from "../scripts/registry/IViewModelRegistry";
import IUriResolver from "../scripts/navigation/IUriResolver";
import UriResolver from "../scripts/navigation/UriResolver";
import BarViewModel from "./fixtures/viewmodels/BarViewModel";
import FooIndexViewModel from "./fixtures/viewmodels/FooIndexViewModel";
import IndexViewModel from "./fixtures/viewmodels/IndexViewModel";
import RootViewModel from "./fixtures/viewmodels/RootViewModel";
import * as Area from "../scripts/registry/Area";
import {Screen} from "../scripts/registry/Screen";

describe("UriResolver, given an URI", () => {

    let registry: IViewModelRegistry;
    let subject: IUriResolver;

    beforeEach(() => {
        registry = new ViewModelRegistry();
        subject = new UriResolver(registry, {basename: "/app/"});
    });

    context("when there are no parameters", () => {

        beforeEach(() => {
            registry.add(Screen.forViewModel(BarViewModel)).forArea("Admin");
        });

        it("should return the corresponding viewmodel identifier", () => {
            let resource = subject.resolve("/admin/bar");

            expect(resource.viewmodel.id).to.be("Bar");
        });

        context("and the viewmodel has been registered in a lower case area", () => {
            it("should return the correct area identifier", () => {
                registry.add(Screen.forViewModel(BarViewModel)).forArea("tools");
                let resource = subject.resolve("/tools/bar");

                expect(resource.area).to.be("tools");
            });
        });
    });

    context("when it contains some parameters", () => {

        beforeEach(() => {
            registry.add(Screen.forViewModel(BarViewModel).withParameters(":id/:subCategory")).forArea("Admin");
        });

        it("should return the corresponding viewmodel identifier and the parameters", () => {
            let resource = subject.resolve("/admin/bar/25/56");

            expect(resource.area).to.be("Admin");
            expect(resource.viewmodel.id).to.be("Bar");
            expect(resource.viewmodel.parameters).to.be(":id/:subCategory");
        });
    });

    context("when it's the root of an area", () => {
        context("and there is a specific Index viewmodel associated", () => {
            it("should return the viewmodel identifier composed by the name of the area plus Index", () => {
                registry.add(Screen.forViewModel(FooIndexViewModel)).forArea("Foo");
                let resource = subject.resolve("/foo");

                expect(resource.viewmodel.id).to.be("FooIndex");
            });
        });

        context("and this area needs some parameters", () => {
            it("should correctly resolve the viewmodel", () => {
                registry.add(Screen.forViewModel(FooIndexViewModel).withParameters(":id")).forArea("Foo");
                let resource = subject.resolve("/foo/25");

                expect(resource.viewmodel.id).to.be("FooIndex");
                expect(resource.viewmodel.parameters).to.be(":id");
            });
        });

        context("and there is not a specific Index viewmodel associated", () => {

            beforeEach(() => {
                registry.add(Screen.forViewModel(IndexViewModel)).forArea("Admin");
            });

            it("should return the Index viewmodel identifier", () => {
                let resource = subject.resolve("/admin");

                expect(resource.viewmodel.id).to.be("Index");
            });
        });
    });

    context("when it's the root of the application", () => {
        context("when it's registered with the standard Index name", () => {

            beforeEach(() => {
                registry.index(Screen.forViewModel(IndexViewModel));
            });

            it("should return the Index viewmodel identifier", () => {
                let resource = subject.resolve("/");

                expect(resource.area).to.be("Index");
                expect(resource.viewmodel.id).to.be("Index");
            });
        });

        context("when it's registered with a name different than index", () => {

            beforeEach(() => {
                registry.index(Screen.forViewModel(RootViewModel));
            });

            it("should return the Index viewmodel identifier", () => {
                let resource = subject.resolve("/");

                expect(resource.area).to.be("Index");
                expect(resource.viewmodel.id).to.be("Root");
            });
        });
    });

    context("when it's the master application container", () => {
        it("should return the master viewmodel identifier", () => {
            registry.master(Screen.forViewModel(RootViewModel));
            let resource = subject.resolve(Area.Master);

            expect(resource.area).to.be(Area.Master);
            expect(resource.viewmodel.id).to.be("Root");
        });
    });

    context("when the uri contains some query string parameters", () => {
        it("should ignore those parameters during the uri resolution", () => {
            registry.add(Screen.forViewModel(FooIndexViewModel)).forArea("Foo");
            let resource = subject.resolve("/foo?id=20");

            expect(resource.viewmodel.id).to.be("FooIndex");
        });
    });

    context("when it's a page that does not exists", () => {
        beforeEach(() => registry.notFound(Screen.forViewModel(RootViewModel)));
        it("should return the 404 handler", () => {
            let resource = subject.resolve("/inexistent");

            expect(resource.area).to.be(Area.NotFound);
            expect(resource.viewmodel.id).to.be("Root");
        });

        context("and it contains a viewmodel identifier", () => {
            it("should return the 404 handler", () => {
                let resource = subject.resolve("/inexistent/testViewmodel");

                expect(resource.area).to.be(Area.NotFound);
                expect(resource.viewmodel.id).to.be("Root");
            });
        });

        context("and it's resolved using the special NotFound identifier", () => {
            it("should return the 404 handler", () => {
                let resource = subject.resolve(Area.NotFound);

                expect(resource.area).to.be(Area.NotFound);
                expect(resource.viewmodel.id).to.be("Root");
            });
        });

        context("but it contains a registered area", () => {
            beforeEach(() => {
                registry.add(Screen.forViewModel(BarViewModel)).forArea("Admin");
            });

            it("should return the 404 handler", () => {
                let resource = subject.resolve("/admin/inexistent");

                expect(resource.area).to.be(Area.NotFound);
                expect(resource.viewmodel.id).to.be("Root");
            });
        });
    });
});
