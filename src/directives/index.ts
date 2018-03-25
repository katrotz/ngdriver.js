import angular from 'angular';

import { driverStepFactory } from "./driver-step.directive";

export default function register(app: angular.IModule) {
    app.directive('driverStep', driverStepFactory);

    return app;
};
