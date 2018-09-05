describe('DriverService', function() {
  describe('provider', function() {
    const driverOptions = {
      animate: false,
      opacity: 1,
      padding: 0,
      allowClose: false,
      stageBackground: '#000000',
      showButtons: true,
      doneBtnText: 'Done',
      closeBtnText: 'Close',
      nextBtnText: 'Next',
      prevBtnText: 'Previous',
      onHighlightStarted: function() {},
      onHighlighted: function() {},
      onDeselected: function() {}
    };
    beforeEach(module('ng.driver', function(driverServiceProvider) {
      driverServiceProvider.setOptions(driverOptions);
    }));

    beforeEach(inject(function(_driverService_) {
      this.driverService = _driverService_;
    }));

    it('should set the options of the driver.js', function() {
      Reflect.ownKeys(driverOptions).forEach(key => {
        expect(this.driverService.options[key]).toBe(driverOptions[key]);
      });
    });
  });
});
