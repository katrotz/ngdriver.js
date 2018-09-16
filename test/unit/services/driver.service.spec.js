import { getDriverOptions, initApp } from './../../__mocks';

describe('DriverService', function() {
  describe('provider', function() {
    const driverOptions = getDriverOptions();

    beforeEach(() => initApp(driverOptions));

    beforeEach(inject(function(_driverService_) {
      this.driverService = _driverService_;
    }));

    it('should set the options of the driver.js', function() {
      Reflect.ownKeys(driverOptions).forEach(key => {
        expect(this.driverService.options[key]).toBe(driverOptions[key]);
      });
    });
  });

  describe('service', function() {
    beforeEach(() => initApp());

    beforeEach(inject(function(_driverService_) {
      this.driverService = _driverService_;
    }));

    beforeEach(function() {
      document.querySelector('.ngApp').innerHTML = `
        <div class="highlightme">Highlight me</div>
      `;
    });

    afterEach(function() {
      document.querySelector('.ngApp').innerHTML = '';
    });

    it('should allow tour registration based on the title only', function() {
      const title = 'Test tour';

      this.driverService.createTour(title);

      const tour = this.driverService.getTour(title);

      expect(tour.title).toEqual(title);
      expect(tour.steps).toEqual([]);
    });

    it('should allow incremental tour step definition', function() {
      const title = 'Test tour';
      const step = {
        element: '.highlightme'
      };
      let error;

      this.driverService.createTour(title);

      this.driverService.addTourStep(title, step);

      try {
        this.driverService.startTour(title);
      } catch (e) {
        error = e;
      }

      expect(error instanceof Error).toBe(false);
      expect(this.driverService.isActivated).toBe(true);
    });

    it('should allow step definition in an unordered fashion', function() {
      const title = 'Test tour';
      const steps = [{
        element: '.element1',
        stageBackground: '#111111'
      }, {
        element: '.element2',
        stageBackground: '#222222'
      }, {
        element: '.elemen3',
        stageBackground: '#333333'
      }];

      this.driverService.createTour(title);

      this.driverService.addTourStep(title, steps[2], 3); // intentionally leaves the step index 2 empty
      this.driverService.addTourStep(title, steps[0], 0);
      this.driverService.addTourStep(title, steps[1], 1);

      const tour = this.driverService.getTour(title);

      expect(tour.steps.length).toEqual(4); // includes the empty step under index 2

      expect(tour.steps[0].stageBackground).toEqual(steps[0].stageBackground);
      expect(tour.steps[1].stageBackground).toEqual(steps[1].stageBackground);
      expect(tour.steps[2]).toBeUndefined();
      expect(tour.steps[3].stageBackground).toEqual(steps[2].stageBackground);
    });

    it('should not start an invalid tour', function() {
      const title = 'Tour without steps';
      const tour = this.driverService.createTour(title);
      let error = null;

      try {
        this.driverService.startTour(title);
      } catch (e) {
        error = e;
      }

      expect(error instanceof Error).toBe(true);
      expect(this.driverService.isActivated).toBe(false);
    });

    it('should start a valid tour', function() {
      const title = 'Tour with steps';
      const steps = [{
        element: '.highlightme'
      }];
      const tour = this.driverService.createTour(title, steps);
      let error = null;

      try {
        this.driverService.startTour(title);
      } catch (e) {
        error = e;
      }

      expect(error instanceof Error).toBe(false);
      expect(this.driverService.isActivated).toBe(true);
    });
  });
});
