'use strict';

(function () {
  var mapPins = document.querySelector(window.ClassNames.mapPins);

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

  var activatePage = function () {
    window.mapFile.showMap();

    mapPins.appendChild(window.mapFile.renderFragment());
    var mapPinList = mapPins.querySelectorAll(window.ClassNames.mapPin);
    window.main.mapPin = mapPins.querySelector(window.ClassNames.mapPin);

    Array.from(mapPinList).forEach(function (mapPin, index) {
      var showCard = function () {
        window.card.openCard(index);
      };

      var onCardEnterPress = function (evt) {
        window.util.onEnterPress(evt, function () {
          showCard();
        });
      };

      if (!mapPin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mainPin))) {
        mapPin.addEventListener('click', showCard);
        mapPin.addEventListener('keydown', onCardEnterPress);
      }
    });

    window.form.adForm.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.adFormDisabled));
    window.form.activateFields(window.form.adForm);
    window.form.activateFields(window.mapFile.mapFilters);

    window.form.renderAddress(window.form.MainPinActive);
  };

  window.form.mapPinMain.addEventListener('keydown', function (evt) {
    if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
      window.util.onEnterPress(evt, activatePage);
    }
  });

  window.main.disablePage();
})();
