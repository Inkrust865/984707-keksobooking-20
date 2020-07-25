'use strict';

(function () {
  var includeFeature = function (pin, featureName) {
    return pin.offer.features.some(function (feature) {
      return feature === featureName;
    });
  };

  window.updatePinsList = {
    mapPins: document.querySelector(window.ClassNames.mapPins),
    checkForFeatures: function (pin) {
      var activateCheckboxes = Object.keys(window.filter.checkboxFilterList);

      return activateCheckboxes.every(function (filter) {
        return window.filter.checkboxFilterList[filter]
          ? includeFeature(pin, filter)
          : true;
      });
    },
    filterCheck: function (filterStatus, pin, filterType, cb) {
      if (filterStatus !== 'any') {
        return cb(pin, filterType, filterStatus);
      }

      return true;
    },
    swapPinActive: function (pinList) {
      pinList.forEach(function (pin) {
        if (document.activeElement === pin) {
          pin.classList.add(window.util.getClassWithoutPoint(window.ClassNames.mapPinActive));
        } else {
          pin.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.mapPinActive));
        }
      });
    },
    updateBookingPins: window.debounce(function () {
      window.updatePinsList.newPinsList = window.updatePinsList.pinsList
        .filter(function (pin) {
          var filters = Object.keys(window.filter.filterList);

          return filters.every(function (filterType) {
            return window.updatePinsList.filterCheck(
                window.filter.filterList[filterType],
                pin,
                filterType,
                window.filter.filterUpdateCallbacks[filterType]
            );
          }) && window.updatePinsList.checkForFeatures(pin);
        });

      var newPinsFragment = window.mapFile.renderFragment(window.updatePinsList.newPinsList);

      window.updatePinsList.mapPins.appendChild(newPinsFragment);

      window.updatePinsList.mapPinList = window.updatePinsList.mapPins.querySelectorAll(window.ClassNames.mapPin);
      window.updatePinsList.mapPin = window.updatePinsList.mapPins.querySelector(window.ClassNames.mapPin);

      Array.from(window.updatePinsList.mapPinList).forEach(function (mapPin, index, pinList) {
        window.updatePinsList.showCard = function () {
          window.updatePinsList.swapPinActive(pinList);

          window.card.openCard(index);
        };

        window.updatePinsList.onCardEnterPress = function (evt) {
          window.util.onEnterPress(evt, function () {
            window.updatePinsList.showCard = function () {
              window.card.openCard(index);
            };
          });
        };

        if (!mapPin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mainPin))) {
          if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
            mapPin.classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));
          }

          mapPin.addEventListener('click', window.updatePinsList.showCard);

          if (!document.querySelector(window.ClassNames.mapCard)) {
            mapPin.addEventListener('keydown', window.updatePinsList.onCardEnterPress);
          }
        }
      });
    })
  };

  window.updatePinsList.onLoad = function (data) {
    window.updatePinsList.pinsList = data;
    window.updatePinsList.updateBookingPins();
    window.form.activateFields(window.mapFile.mapFilters);
  };

  window.backend.load(window.updatePinsList.onLoad, window.error.onErrorGet);
})();
