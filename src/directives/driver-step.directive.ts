import angular from 'angular';
import Driver from 'driver.js';

import { DriverService } from "../services/driver.service";

class DriverStepController implements angular.IController {
    static $inject: string[] = ['$element', '$attrs', 'driverService'];

    private $element: angular.IAugmentedJQuery;
    private $attrs: angular.IAttributes;
    private driverService: DriverService;
    private driverStep: string = 'root-driver-tour';
    private driverStepIndex: number = 0;
    private driverStepOptions: Driver.Step|undefined = undefined;

    constructor($element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, driverService: DriverService) {
        this.$element = $element;
        this.$attrs = $attrs;
        this.driverService = driverService;
    }

    $onInit() {
        const step = Object.assign({
            element: this.getElementSelector()
        }, this.driverStepOptions);

        this.driverService.addTourStep(this.driverStep, step, this.driverStepIndex);
    }

    getElementSelector() {
        const attr = Object.assign({ driverStep: '', driverStepIndex: '' }, this.$attrs.$attr);

        const driverStepSelector = `[${attr.driverStep}="${this.$attrs.driverStep}"]`;
        const driverStepIndexSelector = `[${attr.driverStepIndex}="${this.$attrs.driverStepIndex}"]`;

        return `${driverStepSelector}${driverStepIndexSelector}`;
    }
}

export function driverStepFactory(): angular.IDirective {
    return {
        restrict: 'A',
        bindToController: true,
        controller: DriverStepController,
        scope: {
            // The tour identifier the step belongs to
            driverStep: '<',

            // The index of the current step in the tour steps
            driverStepIndex: '<',

            // The step options
            driverStepOptions: '<?'
        }
    };
}