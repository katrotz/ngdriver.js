export const initApp = function(driverOptions = null) {

  document.body.innerHTML += `<div class="ngApp"></div>`;

  return module('ng.driver', function(driverServiceProvider) {
    if (driverOptions) {
      driverServiceProvider.setOptions(driverOptions);
    }
  })
};

export const getDriverOptions = function(overrides = {}) {
  return Object.assign({
    animate: true,                    // Whether to animate or not
    opacity: 0.75,                    // Background opacity (0 means only popovers and without overlay)
    padding: 10,                      // Distance of element from around the edges
    allowClose: true,                 // Whether the click on overlay should close or not
    overlayClickNext: false,          // Whether the click on overlay should move next
    doneBtnText: 'Done',              // Text on the final button
    closeBtnText: 'Close',            // Text on the close button for this step
    stageBackground: '#ffffff',       // Background color for the staged behind highlighted element
    nextBtnText: 'Next',              // Next button text for this step
    prevBtnText: 'Previous',          // Previous button text for this step
    showButtons: true,               // Do not show control buttons in footer
    keyboardControl: true,            // Allow controlling through keyboard (escape to close, arrow keys to move)
    scrollIntoViewOptions: {},        // We use `scrollIntoView()` when possible, pass here the options for it if you want any
    onHighlightStarted: (Element) => {}, // Called when element is about to be highlighted
    onHighlighted: (Element) => {},      // Called when element is fully highlighted
    onDeselected: (Element) => {},       // Called when element has been deselected
    onReset: (Element) => {},            // Called when overlay is about to be cleared
    onNext: (Element) => {},             // Called when moving to next step on any step
    onPrevious: (Element) => {},         // Called when moving to next step on any step
  }, overrides)
};

export const getDriverStepDefinition = (element = null, popover = {}) => {
  return Object.assign({}, {
    popover: Object.assign({
      title: 'Generic popover title',
      description: 'Generic popover description',
      position: 'bottom', // `top`, `left`, `right`, `bottom`
      offset: 0,
    }, popover)
  }, element ? { element } : {});
};

export const getDriverCallbacks = function() {
  return ['onHighlightStarted', 'onHighlighted', 'onDeselected', 'onReset', 'onNext', 'onPrevious'];
};

export const getDirectiveTemplate = function() {
  return `
    <div data-tour="title" data-tour-step-index="index" data-tour-step-options="options">{{title}} {{index}}</div>
  `;
};