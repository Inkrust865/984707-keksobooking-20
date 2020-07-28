'use strict';

(function () {
  var MouseButtons = {
    LEFT: 0
  };
  var mapPinList = [];

  var disablePage = function () {
    window.pinsList.mapPinList = window.pinsList.mapPins.querySelectorAll(window.ClassNames.MAP_PIN);

    Array.from(window.pinsList.mapPinList).forEach(function (mapPin) {
      if (!mapPin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.MAIN_PIN))) {
        mapPin.classList.add(window.util.getClassWithoutPoint(window.ClassNames.HIDDEN));
      }
    });

    window.mapFile.hideMap();

    window.form.adForm.classList.add(window.util.getClassWithoutPoint(window.ClassNames.AD_FORM_DISABLED));
    window.form.disableFields(window.form.adForm);
    window.form.disableFields(window.filter.filterForm);
    window.filter.resetFilter();

    window.form.renderAddress(window.form.MainPinDisabled);
  };

  var activatePage = function () {
    window.mapFile.showMap();

    Array.from(window.pinsList.mapPinList).forEach(function (pin) {
      if (pin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.HIDDEN))) {
        pin.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.HIDDEN));
      }
    });

    window.form.adForm.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.AD_FORM_DISABLED));
    window.form.activateFields(window.form.adForm);
    if (window.pinsList.mapPinList.length > 1) {
      window.form.activateFields(window.filter.filterForm);
    }

    window.form.renderAddress(window.form.MainPinActive);
  };

  window.form.mapPinMain.addEventListener('keydown', function (evt) {
    if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.MAP_FADED))) {
      window.util.onEnterPress(evt, activatePage);
    }
  });

  window.main = {
    MouseButtons: MouseButtons,
    mapPinList: mapPinList,
    activatePage: activatePage,
    disablePage: disablePage
  };

  disablePage();
})();
