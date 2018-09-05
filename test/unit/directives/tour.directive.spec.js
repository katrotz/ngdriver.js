import { getDefaultDriverOptions, getDirectiveTemplate, initApp } from './../../__mocks';

describe('TourDirective', function() {
  const driverOptions = getDefaultDriverOptions();
  const directiveTemplate = getDirectiveTemplate();

  beforeEach(() => initApp(driverOptions));

  beforeEach(inject(function(_$rootScope_, _$compile_, _driverService_) {
    this.driverService = _driverService_;
    this.$compile = _$compile_;
    this.$rootScope = _$rootScope_;
    this.$scope = this.$rootScope.$new();
  }));

  beforeEach(function() {
    const $scope = this.$scope;
    const $compile = this.$compile;
    this.compileDirective = function(title, index = 0, options = {}) {
      Object.assign($scope, { title, index, options });

      const $element = $compile(directiveTemplate)($scope);

      $scope.$apply();

      return $element;
    }
  });

  it('should create a new tour', function() {
    spyOn(this.driverService, 'createTour').and.callThrough();

    const title = 'New tour';
    const $element = this.compileDirective(title);

    expect(this.driverService.createTour).toHaveBeenCalled();
    expect(this.driverService.getTour(title)).toBeDefined();
  });

  it('should register tour steps', function() {
    spyOn(this.driverService, 'addTourStep').and.callThrough();

    const title = 'New tour';
    const options = { stageBackground: '#fafafa' };
    const $element1 = this.compileDirective(title, 0, options);
    const $element2 = this.compileDirective(title, 1, options);
    const $element3 = this.compileDirective(title, 2, options);

    const tour = this.driverService.getTour(title);

    expect(this.driverService.addTourStep).toHaveBeenCalledTimes(3);
    expect(tour).toBeDefined();
    expect(tour.steps.length).toBe(3);
    expect(tour.steps[0].stageBackground).toEqual(options.stageBackground);
  });
});
