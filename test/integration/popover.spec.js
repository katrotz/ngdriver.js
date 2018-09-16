import {
  getDriverOptions,
  getDriverCallbacks,
  initApp, getDirectiveTemplate, getDriverStepDefinition
} from "../__mocks";

const CLASS_POPOVER_TITLE = 'driver-popover-title';
const CLASS_POPOVER_DESCRIPTION = 'driver-popover-description';

describe('Driver.js popover', function() {
  const driverCallbacks = getDriverCallbacks();
  const directiveTemplate = getDirectiveTemplate();
  const driverOptions = getDriverOptions(
    driverCallbacks.reduce((overrides, callback) => (Object.assign(overrides, {[callback]: jasmine.createSpy(callback)})), {})
  );

  beforeEach(() => initApp(driverOptions));

  beforeEach(inject(function(_$rootScope_, _$compile_, _driverService_) {
    this.driverService = _driverService_;
    this.$compile = _$compile_;
    this.$rootScope = _$rootScope_;
    this.$scope = this.$rootScope.$new();
  }));

  beforeAll(function() {
    document.body.insertAdjacentHTML('afterbegin', `<div id="fixtures"></div>`);
  });

  afterAll(function() {
    document.body.removeChild(document.getElementById('fixtures'));
  });

  beforeEach(function() {
    const $compile = this.$compile;
    this.appendNodeToDom = function(node) {
      document.getElementById('fixtures').appendChild(node);
    };
    this.compileDirective = function(title, index = 0, options = {}) {
      const $scope = this.$rootScope.$new();
      Object.assign($scope, { title, index, options });

      const $element = $compile(directiveTemplate)($scope);

      $scope.$apply();

      return $element;
    };
  });

  it('should be configurable via tour directive', function(done) {
    const title = 'Popover via tour directive';
    const stepOptions = getDriverStepDefinition();
    const $element0 = this.compileDirective(title, 0, stepOptions);

    this.appendNodeToDom($element0[0]);

    this.driverService.startTour(title);

    setTimeout(() => {
      const popoverTitle = document.querySelector(`.${CLASS_POPOVER_TITLE}`).textContent;
      const popoverDescription = document.querySelector(`.${CLASS_POPOVER_DESCRIPTION}`).textContent;

      expect(popoverTitle).toEqual(stepOptions.popover.title);
      expect(popoverDescription).toEqual(stepOptions.popover.description);
      done();
    });
  });
});