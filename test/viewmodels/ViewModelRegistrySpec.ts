import "reflect-metadata";
import expect = require("expect.js");
import * as Rx from "rx";
import {IViewModelRegistry} from "../../scripts/registry/IViewModelRegistry";
import ViewModelRegistry from "../../scripts/registry/ViewModelRegistry";
import FooViewModel from "../fixtures/viewmodels/FooViewModel";
import BarViewModel from "../fixtures/viewmodels/BarViewModel";
import RootViewModel from "../fixtures/viewmodels/RootViewModel";
import UnregisteredViewModel from "../fixtures/viewmodels/UnregisteredViewModel";
import ViewModelContext from "../../scripts/registry/ViewModelContext";
import {Screen} from "../../scripts/registry/Screen";

describe("ViewModelRegistry, given a list of ViewModel identifiers", () => {

    let registry: IViewModelRegistry;

    beforeEach(() => {
        registry = new ViewModelRegistry();
    });

    context("when registered for a specific area", () => {
        it("should assign such entries to the specified area", () => {
            let area = registry
                .add(FooViewModel)
                .add(BarViewModel)
                .forArea("Admin");

            expect(area.entries[0].id).to.eql("Foo");
            expect(area.entries[1].id).to.eql("Bar");
        });

        context("and custom parameters are needed", () => {
            it("should add such parameters to the entry as well", () => {
                let area = registry.add(FooViewModel, null, ":id").forArea("Admin");

                expect(area.entries[0].id).to.eql("Foo");
                expect(area.entries[0].parameters).to.eql(":id");
            });

            it("should add such parameters also via a builder method", () => {
                let area = registry.add(FooViewModel, null).withParameters(":id").forArea("Admin");

                expect(area.entries[0].id).to.eql("Foo");
                expect(area.entries[0].parameters).to.eql(":id");
            });
        });

        context("when a fluent registration is used", () => {
            it("should add the viewmodel to the registry", () => {
                let area = registry.add(Screen.forViewModel(FooViewModel)).forArea("Admin");

                expect(area.entries[0].id).to.eql("Foo");
            });

            it("should set an observable controller on it", () => {
                let controller = (context) => ({model: null, refresh: null});
                let area = registry.add(Screen.forViewModel(FooViewModel).useController(controller)).forArea("Admin");

                expect(area.entries[0].id).to.eql("Foo");
                expect(area.entries[0].source).to.be(controller);
            });

            it("should set custom routing parameters on it", () => {
                let area = registry.add(Screen.forViewModel(FooViewModel).withParameters(":test")).forArea("Admin");

                expect(area.entries[0].id).to.eql("Foo");
                expect(area.entries[0].parameters).to.be(":test");
            });
        });
    });

    context("when the root viewmodel has to be registered", () => {
        it("should be registered as a default in the registry", () => {
            registry.index(BarViewModel);

            expect(registry.getArea("Index").entries[0].id).to.eql("Bar");
        });
    });

    context("when the master application container viewmodel has to be registered", () => {
        it("should be registered as a default in the registry", () => {
            registry.master(BarViewModel);

            expect(registry.getArea("Master").entries[0].id).to.eql("Bar");
        });
    });

    context("when a custom notify function is provided", () => {
        it("should be set on the viewmodel", () => {
            let notify = (context: ViewModelContext) => "foo";
            let area = registry.add(FooViewModel, null).notifyBy(notify).forArea("Admin");

            expect(area.entries[0].notify).to.be(notify);
        });
    });

    context("when a registration is overridden", () => {
        it("should not duplicate the entry", () => {
            registry.add(FooViewModel).add(BarViewModel).forArea("Admin");
            registry.add(BarViewModel).add(FooViewModel).forArea("Admin");

            expect(registry.getArea("Admin").entries[0].id).to.eql("Bar");
        });
    });

    context("when requested to return the entries for a specific area", () => {
        it("should return only the entries pertaining to that area", () => {
            registry.add(FooViewModel).add(BarViewModel).forArea("Admin");

            expect(registry.getArea("Admin").entries[0].id).to.eql("Foo");
            expect(registry.getArea("Admin").entries[1].id).to.eql("Bar");
        });

        context("and the area identifier is case sensitive", () => {
            it("should transform it and return the entries pertaining", () => {
                registry.add(FooViewModel).add(BarViewModel).forArea("Admin");

                expect(registry.getArea("admin").entries[0].id).to.eql("Foo");
                expect(registry.getArea("admin").entries[1].id).to.eql("Bar");
            });
        });

        context("when the area does not exist", () => {
            it("should return an empty lookup", () => {
                let lookup = registry.getEntry("Test", "ViewModel");

                expect(lookup).to.eql({area: null, viewmodel: null});
            });
        });
    });

    context("when requested to return a specific entry", () => {
        it("should find and return it", () => {
            registry.add(FooViewModel).add(BarViewModel).forArea("Admin");

            expect(registry.getEntry("admin", "Bar").viewmodel.id).to.eql("Bar");
        });
    });

    context("when requested to return a specific entry passing its viewmodel", () => {
        it("should find and return it", () => {
            registry.add(FooViewModel).add(BarViewModel).forArea("Admin");
            let entry = registry.getEntry(FooViewModel);

            expect(entry.area).to.eql("Admin");
            expect(entry.viewmodel.construct).to.be(FooViewModel);
        });
    });

    context("when multiple areas are registered", () => {
        it("should return the list of those areas", () => {
            registry.add(FooViewModel).forArea("Admin");
            registry.add(FooViewModel).forArea("Users");
            let areas = registry.getAreas();

            expect(areas).to.have.length(2);
            expect(areas[0].area).to.be("Admin");
            expect(areas[1].area).to.be("Users");
        });
    });

    context("when a factory function that specifies what the viewmodel's parameters will be is supplied", () => {
        it("should register this specific viewmodel", () => {
            registry.add(FooViewModel, parameters => Rx.Observable.just(10), ":counter").forArea("Admin");
            let factory = registry.getEntry("Admin", "Foo").viewmodel.source;

            expect(factory).to.not.be(null);
        });

        it("should register the root viewmodel", () => {
            registry.index(RootViewModel, parameters => Rx.Observable.just(10));
            let id = registry.getEntry("Index", "Root").viewmodel.id;

            expect(id).to.be("Root");
        });
    });

    context("when a viewmodel name is not assigned", () => {
        it("should throw an error regarding the missing registration", () => {
            expect(() => {
                registry.add(UnregisteredViewModel).forArea("Admin");
            }).to.throwError();
        });
    });
});
