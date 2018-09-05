export const initApp = function(driverOptions = null) {

  document.body.innerHTML += `<div class="ngApp"></div>`;

  return module('ng.driver', function(driverServiceProvider) {
    if (driverOptions) {
      driverServiceProvider.setOptions(driverOptions);
    }
  })
};

export const getDefaultDriverOptions = function() {
  return {
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
  }
};

export const getDirectiveTemplate = function() {
  return `
    <div tour="title" tour-step-index="index" tour-step-options="options">Tour directive</div>
  `;
};