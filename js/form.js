'use strict';

(function () {
  window.form = {
    adForm: document.querySelector(window.ClassNames.adForm),
    resetButton: document.querySelector(window.ClassNames.resetButton),
    mapPinMain: document.querySelector(window.ClassNames.mainPin),
    MainPinActive: {
      X: 33,
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

  var mapPins = document.querySelector(window.ClassNames.mapPins);
  var selectList = window.form.adForm.querySelectorAll('select');
  var inputAddress = window.form.adForm.querySelector('input[name="address"]');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var roomsAndGuestsRules = [
    {roomNumber: '1', capacityValues: ['1']},
    {roomNumber: '2', capacityValues: ['1', '2']},
    {roomNumber: '3', capacityValues: ['1', '2', '3']},
    {roomNumber: '100', capacityValues: ['0']}
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
    }) || {roomNumber: '', capacityValues: []};
  }


  var setValidityRule = function () {
    if (getCurrentRule(roomsAndGuestsRules).capacityValues.includes(capacity.value)) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity('Необходимо изменить количество мест');
    }
  };

  var ruleAcceptation = function () {
    var rule = getCurrentRule(roomsAndGuestsRules);

    Array
      .from(capacityOptions)
      .forEach(function (option) {
        if (rule.capacityValues.includes(option.value)) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      });
  };

  var onRoomNumberChange = function () {
    ruleAcceptation();
    setValidityRule();
  };

  var onCapacityChange = function () {
    setValidityRule();
  };

  roomNumber.addEventListener('change', onRoomNumberChange);
  capacity.addEventListener('change', onCapacityChange);

  var cleanSelect = function () {
    Array.from(selectList).forEach(function (select) {
      var currentValue = select.querySelector('option[selected]');
      select.value = currentValue.value;

      renderInitialStateCapacity();
    });
  };

  var cleanFields = function () {
    window.form.adForm.reset();
    cleanSelect();

    window.form.renderAddress(window.form.MainPinActive);
  };

  var onResetButton = function (evt) {
    evt.preventDefault();

    cleanFields();
  };

  window.form.resetButton.addEventListener('click', onResetButton);

  var onPublish = function () {
    window.formMessage.renderSuccessMessage();

    document.addEventListener('keydown', window.formMessage.onSuccessMessageEscPress);
    document.addEventListener('click', window.formMessage.onSuccessMessageMousePress);

    window.main.disablePage();
    cleanFields();
    window.util.BookingList.forEach(function () {
      mapPins.removeChild(mapPins.lastChild);
    });

    var card = window.mapFile.map.querySelector(window.ClassNames.mapCard);
    card.classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));

    capacity.removeEventListener('invalid', onCapacityChange);
    roomNumber.removeEventListener('change', onRoomNumberChange);
  };

  window.form.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.publish(new FormData(window.form.adForm), onPublish, window.error.onError);

    window.form.resetButton.removeEventListener('click', cleanFields);
    document.removeEventListener('keydown', window.formMessage.onSuccessMessageEscPress);
    document.removeEventListener('click', window.formMessage.onSuccessMessageMousePress);
    document.removeEventListener('keydown', window.formMessage.onErrorMessageEscPress);
    document.removeEventListener('click', window.formMessage.onErrorMessageMousePress);
  });
})();
