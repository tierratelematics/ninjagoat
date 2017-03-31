import "reflect-metadata";
import expect = require("expect.js");
import {DisabledModule, ValidModule, WithoutFTModule} from "./fixtures/Modules";
import {Application} from "../scripts/bootstrap/Application";

describe("Application, given some modules", () => {

    let application:Application;

    beforeEach(() => {
        application = new Application();
    });

    context("when a module does not check under a feature toggle", () => {
        it("should not be registered", () => {
            expect(application.register(new DisabledModule())).to.be(false);
        });
    });

    context("when a module validates under a feature toggle", () => {
        it("should be registered", () => {
            expect(application.register(new ValidModule())).to.be(true);
        });
    });

    context("when a modules does not have a feature toggle", () => {
        it("should be registered", () => {
            expect(application.register(new WithoutFTModule())).to.be(true);
        });
    });
});