import angular from 'angular';

import { DriverServiceProvider } from './driver.service';

export default function register(app: angular.IModule) {
    app.provider('driverService', DriverServiceProvider);

    return app;
};
