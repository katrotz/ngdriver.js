import {
  getDriverOptions,
  getDriverCallbacks,
  initApp
} from "../__mocks";

const CLASS_DRIVER_HIGHLIGHTED_ELEMENT = 'driver-highlighted-element';

describe('Driver.js highlight API', function() {
  const driverCallbacks = getDriverCallbacks();
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
    this.appendNodeToDom = function(node) {
      document.getElementById('fixtures').appendChild(node);
    };
  });

  it('should highlight the element via highlight API', function() {
    const title = 'Highlight element';
    const elementClass = 'highlight-api-test';

    this.appendNodeToDom(angular.element(`<div class="${elementClass}">I'm in the spotlight</div>`)[0]);

    this.driverService.highlight(`.${elementClass}`);

    const elementClassList = document.querySelector(`.${elementClass}`).classList;

    expect(elementClassList.contains(CLASS_DRIVER_HIGHLIGHTED_ELEMENT)).toBe(true);
  });
});