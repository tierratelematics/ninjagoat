/// <reference path="../typings/browser.d.ts" />
import expect = require("expect.js");
import sinon = require("sinon");
import NotificationManager from "../scripts/notifications/NotificationManager";
import INotificationManager from "../scripts/notifications/INotificationManager";

describe("NotificationManager, given an area and a viewmodel id", () => {

    let subject:INotificationManager;

    beforeEach(() => {
        subject = new NotificationManager();
    });

    context("when this viewmodel needs notifications about the model change", () => {
        it("should subscribe to the backend");

        context("and custom parameters are needed on the backend side", () => {
            it("should also add these parameters to the subscription request");
        });
    });

    context("when a notifications is not needed anymore", () => {
        it("should dispose the subscription");
    });
});