import expect = require("expect.js");
import * as sinon from "sinon";
import INavigationManager from "../scripts/navigation/INavigationManager";
import NavigationManager from "../scripts/navigation/NavigationManager";
import ILocationHandler from "../scripts/navigation/ILocationHandler";
import LocationHandler from "../scripts/navigation/LocationHandler";
import IViewModelRegistry from "../scripts/registry/IViewModelRegistry";
import ViewModelRegistry from "../scripts/registry/ViewModelRegistry";
import BarViewModel from "./fixtures/viewmodels/BarViewModel";

describe("NavigationManager, given an area", () => {

    let subject:INavigationManager;
    let locationHandler:ILocationHandler;
    let locationStub:sinon.SinonStub;
    let registry:IViewModelRegistry;

    beforeEach(() => {
        registry = new ViewModelRegistry();
        locationHandler = new LocationHandler();
        subject = new NavigationManager(locationHandler, registry);
        locationStub = sinon.stub(locationHandler, "changeLocation", url => {
        });
    });

    afterEach(() => {
        locationStub.restore();
    });

    context("when the area is the default one", () => {
        it("should navigate to the root page", () => {
            subject.navigate("Index");
            expect(locationStub.calledWith("/")).to.be(true);
        });
    });

    context("when the area is not the default one", () => {
        it("should navigate to the corresponding url", () => {
            subject.navigate("Users");
            expect(locationStub.calledWith("/users")).to.be(true);
        });

        context("and a viewmodel identifier is provided", () => {
            it("should navigate to the specific page", () => {
                subject.navigate("Users", "Bar");
                expect(locationStub.calledWith("/users/bar")).to.be(true);
            });

            context("and some parameters needs to be passed to this page", () => {

                beforeEach(() => {
                    registry.add(BarViewModel, null, ":bar/:subCategory").forArea("Users");
                });

                it("should append these parameters", () => {
                    subject.navigate("Users", "Bar", {
                        bar: 20,
                        subCategory: "foo"
                    });
                    expect(locationStub.calledWith("/users/bar/20/foo")).to.be(true);
                });

                context("when a parameter is optional", () => {
                    it("should correctly substitute it", () => {
                        registry.add(BarViewModel, null, "(:bar)").forArea("Fake");
                        subject.navigate("Fake", "Bar", {
                            bar: 20
                        });
                        expect(locationStub.calledWith("/fake/bar/20")).to.be(true);
                    });
                });

                context("when a required parameter is followed by an optional parameter", () => {
                    it("should correctly resolve the url", () => {
                        registry.add(BarViewModel, null, ":id/(:bar)").forArea("Fake");
                        subject.navigate("Fake", "Bar", {
                            id: 50
                        });
                        expect(locationStub.calledWith("/fake/bar/50/")).to.be(true);
                    });
                });
            });
        });
    });
});
