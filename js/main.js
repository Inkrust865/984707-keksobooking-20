'use strict';

(function () {
  window.main = {
    MouseButtons: {
      left: 0
    },
    mapPinList: [],
    onMainPinFirstPress: function (evt) {
      if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
        if (evt.button === window.main.MouseButtons.left) {
          activatePage(evt);
        }
      }
    },
    disablePage: function () {
      window.updatePinsList.mapPinList = window.updatePinsList.mapPins.querySelectorAll(window.ClassNames.mapPin);

      Array.from(window.updatePinsList.mapPinList).forEach(function (mapPin) {
        if (!mapPin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mainPin))) {
          mapPin.classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));
        }
      });

      window.mapFile.hideMap();

      window.form.adForm.classList.add(window.util.getClassWithoutPoint(window.ClassNames.adFormDisabled));
      window.form.disableFields(window.form.adForm);
      window.form.disableFields(window.mapFile.mapFilters);
      window.filter.resetFilter();

      window.form.renderAddress(window.form.MainPinDisabled);
    }
  };

  var activatePage = function () {
    window.mapFile.showMap();

    Array.from(window.updatePinsList.mapPinList).forEach(function (pin) {
      if (pin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.hidden))) {
        pin.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.hidden));
      }
    });

    window.form.adForm.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.adFormDisabled));
    window.form.activateFields(window.form.adForm);
    if (window.updatePinsList.mapPinList.length > 1) {
      window.form.activateFields(window.mapFile.mapFilters);
    }

    window.form.renderAddress(window.form.MainPinActive);
  };

  window.form.mapPinMain.addEventListener('keydown', function (evt) {
    if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
      window.util.onEnterPress(evt, activatePage);
    }
  });

  window.main.disablePage();
})();
