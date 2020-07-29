'use strict';

(function () {
  var mapPins = document.querySelector(window.ClassNames.MAP_PINS);
  var pinsList;

  var includeFeature = function (pin, featureName) {
    return pin.offer.features.some(function (feature) {
      return feature === featureName;
    });
  };

  var checkForFeatures = function (pin) {
    var activateCheckboxes = Object.keys(window.filter.checkboxFilterList);
    return activateCheckboxes.every(function (filter) {
      return window.filter.checkboxFilterList[filter]
        ? includeFeature(pin, filter)
        : true;
    });
  };

  var filterCheck = function (filterStatus, pin, filterType, cb) {
    if (filterStatus !== 'any') {
      return cb(pin, filterType, filterStatus);
    }
    return true;
  };

  var swapPinActive = function (pinList) {
    pinList.forEach(function (pin) {
      if (document.activeElement === pin) {
        pin.classList.add(window.util.getClassWithoutPoint(window.ClassNames.MAP_PIN_ACTIVE));
      } else {
        pin.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.MAP_PIN_ACTIVE));
      }
    });
  };

  var updateBookingPins = window.debounce(function () {
    if (pinsList) {
      window.pinsList.newPinsList = pinsList
        .filter(function (pin) {
          var filters = Object.keys(window.filter.filterList);

          return filters.every(function (filterType) {
            return filterCheck(
                window.filter.filterList[filterType],
                pin,
                filterType,
                window.filter.filterUpdateCallbacks[filterType]
            );
          }) && checkForFeatures(pin);
        });
    } else {
      window.pinsList.newPinsList = 0;
    }

    var newPinsFragment = window.mapFile.renderFragment(window.pinsList.newPinsList);

    mapPins.appendChild(newPinsFragment);

    window.pinsList.mapPinList = mapPins.querySelectorAll(window.ClassNames.MAP_PIN);

    Array.from(window.pinsList.mapPinList).forEach(function (mapPin, index, pinList) {
      window.pinsList.showCard = function () {
        swapPinActive(pinList);
        window.card.openCard(index);
      };

      window.pinsList.onCardEnterPress = function (evt) {
        window.util.onEnterPress(evt, function () {
          window.pinsList.showCard = function () {
            window.card.openCard(index);
          };
        });
      };

      if (!mapPin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.MAIN_PIN))) {
        if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.MAP_FADED))) {
          mapPin.classList.add(window.util.getClassWithoutPoint(window.ClassNames.HIDDEN));
        }

        mapPin.addEventListener('click', window.pinsList.showCard);

        if (!document.querySelector(window.ClassNames.MAP_CARD)) {
          mapPin.addEventListener('keydown', window.pinsList.onCardEnterPress);
        }
      }
    });
  });

  var onErrorGet = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onLoad = function (data) {
    pinsList = data;
    updateBookingPins();
    window.form.activateFields(window.filter.filterForm);
  };

  window.pinsList = {
    mapPins: mapPins,
    updateBookingPins: updateBookingPins
  };

  window.backend.load(onLoad, onErrorGet);
})();
