'use strict';

(function () {
  window.form = {
    adForm: document.querySelector(window.ClassNames.adForm),
    mapPinMain: document.querySelector(window.ClassNames.mainPin),
    MainPinActive: {
      X: 31,
      Y: 84
    },
    MainPinDisabled: {
      X: 31,
      Y: 31
    },
    disableFields: function (formFields) {
      Array.from(formFields)
        .forEach(function (element) {
          element.disabled = true;
        });
    },
    activateFields: function (formFields) {
      Array.from(formFields)
        .forEach(function (element) {
          element.disabled = false;
        });

      renderInitialStateCapacity();
    },
    renderAddress: function (typeMainPin) {
      var top = Math.floor(parseInt(window.form.mapPinMain.style.top, 10));
      var left = Math.floor(parseInt(window.form.mapPinMain.style.left, 10));
      var mainPinX = left + typeMainPin.X;
      var mainPinY = top + typeMainPin.Y;

      inputAddress.value = mainPinX + ', ' + mainPinY;
    }
  };
  var inputAddress = window.form.adForm.querySelector('input[name="address"]');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var adFormSubmit = document.querySelector(window.ClassNames.adFormSubmit);
  var roomsAndGuestsRules = [
    {roomNumber: '1', accessibilityCapacityValues: ['1'], validityCapacityValues: ['1'], mustChange: 'Необходимо изменить количество мест', valid: ''},
    {roomNumber: '2', accessibilityCapacityValues: ['1', '2'], validityCapacityValues: ['1', '2']},
    {roomNumber: '3', accessibilityCapacityValues: ['1', '2', '3'], validityCapacityValues: ['1', '2', '3']},
    {roomNumber: '100', accessibilityCapacityValues: ['0'], validityCapacityValues: ['1', '2', '3']}
  ];

  var renderInitialStateCapacity = function () {
    capacityOptions.forEach(function (option) {
      if (option.value !== '1') {
        option.disabled = true;
      }
    });
  };

  function getCurrentRule(rules) {
    return rules.find(function (ruleRoom) {
      return ruleRoom.roomNumber === roomNumber.value;
    }) || {roomNumber: '', accessibilityCapacityValues: [], validityCapacityValues: []};
  }


  var setValidityRule = function (option, conditionTrue, conditionFalse, rule) {
    if (!rule.validityCapacityValues.includes(option.value)) {
      capacity.setCustomValidity(conditionTrue);
    } else {
      capacity.setCustomValidity(conditionFalse);
    }
  };

  var ruleAcceptation = function (conditionTrue, conditionFalse, disableOption) {
    disableOption = disableOption || false;

    var rule = getCurrentRule(roomsAndGuestsRules);

    Array
      .from(capacityOptions)
      .forEach(function (option) {
        setValidityRule(option, conditionTrue, conditionFalse, rule);

        if (disableOption) {
          option.disabled = !rule.accessibilityCapacityValues.includes(option.value);
        }
      });
  };

  var onRoomNumberChange = function () {
    ruleAcceptation(roomsAndGuestsRules[0].mustChange, roomsAndGuestsRules[0].valid, true);
  };

  var onCapacityChange = function () {
    ruleAcceptation(roomsAndGuestsRules[0].valid, roomsAndGuestsRules[0].mustChange);
  };

  roomNumber.addEventListener('change', onRoomNumberChange);
  capacity.addEventListener('change', onCapacityChange);

  adFormSubmit.addEventListener('submit', function () {
    capacity.removeEventListener('invalid', onCapacityChange);
    roomNumber.removeEventListener('change', onRoomNumberChange);
  });
})();
