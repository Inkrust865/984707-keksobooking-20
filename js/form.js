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
  var selectType = window.form.adForm.querySelector('select[name="type"]');
  var selectTimein = window.form.adForm.querySelector('select[name="timein"]');
  var selectTimeout = window.form.adForm.querySelector('select[name="timeout"]');
  var inputAddress = window.form.adForm.querySelector('input[name="address"]');
  var inputTitle = window.form.adForm.querySelector('input[name="title"]');
  var inputPrice = window.form.adForm.querySelector('input[name="price"]');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var roomsAndGuestsRules = [
    {roomNumber: '1', capacityValues: ['1']},
    {roomNumber: '2', capacityValues: ['1', '2']},
    {roomNumber: '3', capacityValues: ['1', '2', '3']},
    {roomNumber: '100', capacityValues: ['0']}
  ];

  var inputTitleInvalid = function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов!');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Заголовок не должен превышать 100 символов!');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле!');
    } else {
      inputTitle.setCustomValidity('');
    }
  };

  inputTitle.addEventListener('invalid', inputTitleInvalid);

  var inputTitleInput = function () {
    var valueLength = inputTitle.value.length;
    var minLength = inputTitle.minLength;
    var maxLength = inputTitle.maxLength;

    if (valueLength < minLength) {
      inputTitle.setCustomValidity('Еще ' + (minLength - valueLength) + ' символов');
    } else if (valueLength > maxLength) {
      inputTitle.setCustomValidity('Удалите лишние ' + (valueLength - maxLength) + ' символов');
    } else {
      inputTitle.setCustomValidity('');
    }
  };

  inputTitle.addEventListener('input', inputTitleInput);

  var selectTypeChange = function () {
    var compliancesTypeMinPrice = [
      {type: 'bungalo', minPrice: '0'},
      {type: 'flat', minPrice: '1000'},
      {type: 'house', minPrice: '5000'},
      {type: 'palace', minPrice: '10000'}
    ];

    compliancesTypeMinPrice.forEach(function (compliance) {
      if (selectType.value === compliance.type) {
        inputPrice.min = compliance.minPrice;
      }
    });
  };

  selectType.addEventListener('change', selectTypeChange);

  var selectTimeinChange = function () {
    selectTimeout.value = selectTimein.value;
  };

  selectTimein.addEventListener('change', selectTimeinChange);

  var selectTimeoutChange = function () {
    selectTimein.value = selectTimeout.value;
  };

  selectTimeout.addEventListener('change', selectTimeoutChange);

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
    inputTitle.removeEventListener('invalid', inputTitleInvalid);
    inputTitle.removeEventListener('input', inputTitleInput);
    selectType.removeEventListener('change', selectTypeChange);
    selectTimein.addEventListener('change', selectTimeinChange);
    selectTimeout.addEventListener('change', selectTimeoutChange);
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
