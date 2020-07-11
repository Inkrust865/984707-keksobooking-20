'use strict';

(function () {
  var mapPins = document.querySelector(window.ClassNames.mapPins);

  var activatePage = function () {
    window.mapFile.showMap();
    mapPins.appendChild(window.mapFile.renderFragment());
    window.mapFile.map.insertBefore(window.card.renderCard(), window.mapFile.map.querySelector(window.ClassNames.filtersContainer));

    window.form.adForm.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.adFormDisabled));
    window.form.activateFields(window.form.adForm);
    window.form.activateFields(window.mapFile.mapFilters);

    window.form.renderAddress(window.form.MainPinActive);
  };

  window.main = {
    MouseButtons: {
      left: 0
    },
    onMainPinFirstPress: function (evt) {
      if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
        if (evt.button === window.main.MouseButtons.left) {
          activatePage(evt);
        }
      }
    },
    disablePage: function () {
      window.mapFile.hideMap();

      window.form.adForm.classList.add(window.util.getClassWithoutPoint(window.ClassNames.adFormDisabled));
      window.form.disableFields(window.form.adForm);
      window.form.disableFields(window.mapFile.mapFilters);

      window.form.renderAddress(window.form.MainPinDisabled);
    }
  };

  window.form.mapPinMain.addEventListener('keydown', function (evt) {
    if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
      window.util.onEnterPress(evt, activatePage);
    }
  });

  window.main.disablePage();
})();
