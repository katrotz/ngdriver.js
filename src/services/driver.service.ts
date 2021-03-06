import angular from 'angular';
import Driver, { NgDriverTour } from 'driver.js';

export class DriverService extends Driver {
  private $log: angular.ILogService;
  private driverTours: NgDriverTour[] = [];

  constructor($injector: angular.auto.IInjectorService, options: Driver.DriverOptions|undefined) {
    super(options);

    this.$log = $injector.get('$log');
  }

  addTourStep(title: string, step: Driver.Step, stepIndex: number = 0): DriverService {
      const element = step.element;
      const tour = this.getTour(title) || this.createTour(title);
      const stepExists = Boolean(tour.steps.find((s) => (s && s.element === element)));

      if (stepExists) {
          this.$log.warn(`The step index ${stepIndex} of the tour "${title}" was overriden`);
      }

      tour.steps[stepIndex] = step;

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

  startTour(title: string, stepIndex: number = 0): DriverService {
      const tour = this.getTour(title);

      if (!tour) {
          this.$log.error(`Failed to start the tour "${title}" as it was not registered`);

          return this;
      }

      if (!tour.steps.length) {
          throw new Error(`Failed to start the "${tour.title}" tour as no steps were defined`);
      }

      const steps = tour.steps.filter(step => Boolean(step));

      this.defineSteps(steps);

      this.start(stepIndex);

      return this;
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
