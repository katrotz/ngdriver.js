import {
  getDriverOptions,
  getDirectiveTemplate,
  getDriverCallbacks,
  initApp,
  getDriverStepDefinition
} from "../__mocks";

const CLASS_NEXT_STEP_BTN = 'driver-next-btn';
const CLASS_PREV_STEP_BTN = 'driver-prev-btn';

describe('Driver.js callbacks mechanism', function() {
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
    this.clickTooltipNext = function() {
      document.querySelector(`.${CLASS_NEXT_STEP_BTN}`).click();
    };
    this.clickTooltipPrevious = function() {
      document.querySelector(`.${CLASS_PREV_STEP_BTN}`).click();
    };
  });

  it('should invoke the callbacks provided as driver options', function() {
    const title = 'Invoke driver\'s option callbacks';
    const stepOptions = getDriverStepDefinition();
    const $element0 = this.compileDirective(title, 0, stepOptions);
    const $element1 = this.compileDirective(title, 1, stepOptions);

    this.appendNodeToDom($element0[0]);
    this.appendNodeToDom($element1[0]);

    this.driverService.startTour(title);

    // API moveNext/movePrevious do not trigger callbacks, only via popover interactions
    this.clickTooltipNext();
    this.clickTooltipPrevious();

    this.driverService.reset();

    driverCallbacks.forEach((callback) => expect(driverOptions[callback]).toHaveBeenCalled());
  });

  it('should invoke the callbacks provided as step options', function() {
    const title = 'Invoke driver\'s step definition option callbacks';
    const stepOptions = Object.assign(getDriverStepDefinition(), {
      onNext: jasmine.createSpy('onNext'),
      onPrevious: jasmine.createSpy('onPrevious')
    });
    const $element0 = this.compileDirective(title, 0, stepOptions);
    const $element1 = this.compileDirective(title, 1, stepOptions);

    this.appendNodeToDom($element0[0]);
    this.appendNodeToDom($element1[0]);

    this.driverService.startTour(title);

    // API moveNext/movePrevious do not trigger callbacks, only via popover interactions
    this.clickTooltipNext();
    this.clickTooltipPrevious();

    expect(stepOptions.onNext).toHaveBeenCalled();
    expect(stepOptions.onPrevious).toHaveBeenCalled();
  });
});