'use strict';

(function () {
  var mapPins = document.querySelector(window.ClassNames.mapPins);
  var map = document.querySelector(window.ClassNames.map);
  var mapFilters = document.querySelector(window.ClassNames.mapFilters);

  var showMap = function () {
    map.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.mapFaded));
  };

  var activatePage = function () {
    showMap();
    mapPins.appendChild(window.map.renderFragment());
    map.insertBefore(window.card.renderCard(), map.querySelector(window.ClassNames.filtersContainer));

    window.form.adForm.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.adFormDisabled));
    window.form.activateFields(window.form.adForm);
    window.form.activateFields(mapFilters);

    window.form.renderAddress(window.form.MainPinActive);
  };

  var disablePage = function () {
    window.form.disableFields(window.form.adForm);
    window.form.disableFields(mapFilters);

    window.form.renderAddress(window.form.MainPinDisabled);
  };

  window.form.mapPinMain.addEventListener('mousedown', function (evt) {
    if (map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
      if (evt.button === 0) {
        activatePage(evt);
      }
    }
  });

  window.form.mapPinMain.addEventListener('keydown', function (evt) {
    if (map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
      window.util.onEnterPress(evt, activatePage);
    }
  });

  disablePage();
})();
