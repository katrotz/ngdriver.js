import angular from 'angular';
import Driver from 'driver.js';

import { DriverService } from "../services/driver.service";

class TourController implements angular.IController {
    static $inject: string[] = ['$element', '$attrs', 'driverService'];

    private $element: angular.IAugmentedJQuery;
    private $attrs: angular.IAttributes;
    private driverService: DriverService;
    private tour: string = 'root-driver-tour';
    private tourStepIndex: number = 0;
    private tourStepOptions: Driver.Step|undefined = undefined;

    constructor($element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, driverService: DriverService) {
        this.$element = $element;
        this.$attrs = $attrs;
        this.driverService = driverService;
    }

    $onInit() {
        const element = this.getElementSelector();
        const step = Object.assign({ element }, this.tourStepOptions);

        this.driverService.addTourStep(this.tour, step, this.tourStepIndex);
    }

    getElementSelector() {
        const attr = Object.assign({ tour: '', tourStepIndex: '' }, this.$attrs.$attr);

        const tourSelector = `[${attr.tour}="${this.$attrs.tour}"]`;
        const stepIndexSelector = `[${attr.tourStepIndex}="${this.$attrs.tourStepIndex}"]`;

        return `${tourSelector}${stepIndexSelector}`;
    }
}

export function tourDirectiveFactory(): angular.IDirective {
    return {
        restrict: 'A',
        bindToController: true,
        controller: TourController,
        scope: {
            // The tour identifier
            tour: '<',

            // The index of the current step in the tour steps
            tourStepIndex: '<',

            // The step options
            tourStepOptions: '<?'
        }
    };
}
