import angular from 'angular';
import Driver, { NgDriverTour } from 'driver.js';

export class DriverService extends Driver {
  private $injector: angular.auto.IInjectorService;
  private driverTours: NgDriverTour[] = [];

  constructor($injector: angular.auto.IInjectorService, options: Driver.DriverOptions|undefined) {
    super(options);

    this.$injector = $injector;
  }

  addTourStep(title: string, step: Driver.Step, stepIndex: number = 0): DriverService {
      const tour = this.getTour(title) || this.createTour(title);

      tour.steps.splice(stepIndex, 0, step); // TODO Implement step ordering

      return this;
  }

  getTour(title: string): NgDriverTour|undefined {
      const foundTour = this.driverTours.filter((tour) => tour.title === title);

      return foundTour[0];
  }

  createTour(title: string, steps: Driver.Step[] = []): NgDriverTour {
    const tour = { title, steps };

    this.driverTours.push(tour);

    return tour;
  }
}

export class DriverServiceProvider {
    public $get: any = [];
    private options: Driver.DriverOptions|undefined = undefined;

    constructor() {
        this.$get = ['$injector', ($injector: angular.auto.IInjectorService) => {
            return new DriverService($injector, this.options);
        }]
    }

    setOptions(options: Driver.DriverOptions): DriverServiceProvider {
        this.options = options;

        return this;
    }

    getOptions(): Driver.DriverOptions|undefined {
        return this.options;
    }
}
