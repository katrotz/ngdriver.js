import angular from 'angular';

import registerServices from './services/index';
import registerDirectives from './directives/index';
import runApp from './ngdriver.run';
import configApp from './ngdriver.config';

const app = angular.module('ng.driver', []);

export default runApp(
    registerServices(
        registerDirectives(
            configApp(app)
        )
    )
);
