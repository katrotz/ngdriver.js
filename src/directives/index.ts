import angular from 'angular';

import { tourDirectiveFactory } from "./tour.directive";

export default function register(app: angular.IModule) {
    app.directive('tour', tourDirectiveFactory);

    return app;
};
