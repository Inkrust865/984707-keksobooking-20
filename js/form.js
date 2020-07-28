'use strict';

(function () {
  var adForm = document.querySelector(window.ClassNames.AD_FORM);
  var resetButton = document.querySelector(window.ClassNames.RESET_BUTTON);
  var mapPinMain = document.querySelector(window.ClassNames.MAIN_PIN);
  var selectList = adForm.querySelectorAll('select');
  var selectType = adForm.querySelector('select[name="type"]');
  var selectTimein = adForm.querySelector('select[name="timein"]');
  var selectTimeout = adForm.querySelector('select[name="timeout"]');
  var inputAddress = adForm.querySelector('input[name="address"]');
  var inputTitle = adForm.querySelector('input[name="title"]');
  var inputPrice = adForm.querySelector('input[name="price"]');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var tagMain = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector(window.ClassNames.SUCCESS);
  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector(window.ClassNames.ERROR);
  var successMessage = successMessageTemplate.cloneNode(true);
  var errorMessage = errorMessageTemplate.cloneNode(true);

  var roomsAndGuestsRules = [
    {roomNumber: '1', capacityValues: ['1']},
    {roomNumber: '2', capacityValues: ['1', '2']},
    {roomNumber: '3', capacityValues: ['1', '2', '3']},
    {roomNumber: '100', capacityValues: ['0']}
  ];
  var MainPinActive = {
    X: 33,
    Y: 84
  };
  var MainPinDisabled = {
    X: 31,
    Y: 31,
    INITIAL_COORD_X: '570px',
    INITIAL_COORD_Y: '375px'
  };

  var disableFields = function (formFields) {
    Array.from(formFields)
      .forEach(function (element) {
        element.disabled = true;
      });
  };

  var activateFields = function (formFields) {
    Array.from(formFields)
      .forEach(function (element) {
        element.disabled = false;
      });
    renderInitialStateCapacity();
    renderMinPriceType();
  };

  var renderAddress = function (typeMainPin) {
    if (typeMainPin === MainPinDisabled) {
      mapPinMain.style.top = MainPinDisabled.INITIAL_COORD_Y;
      mapPinMain.style.left = MainPinDisabled.INITIAL_COORD_X;
    }
    var top = Math.floor(parseInt(mapPinMain.style.top, 10));
    var left = Math.floor(parseInt(mapPinMain.style.left, 10));
    var mainPinX = left + typeMainPin.X;
    var mainPinY = top + typeMainPin.Y;
    inputAddress.value = mainPinX + ', ' + mainPinY;
  };

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

  var renderMinPriceType = function () {
    var compliancesTypeMinPrice = [
      {type: 'bungalo', minPrice: '0'},
      {type: 'flat', minPrice: '1000'},
      {type: 'house', minPrice: '5000'},
      {type: 'palace', minPrice: '10000'}
    ];

    compliancesTypeMinPrice.forEach(function (compliance) {
      if (selectType.value === compliance.type) {
        inputPrice.min = compliance.minPrice;
        inputPrice.placeholder = compliance.minPrice;
      }
    });
  };

  var selectTypeChange = function () {
    renderMinPriceType();
  };

  var selectTimeinChange = function () {
    selectTimeout.value = selectTimein.value;
  };

  var selectTimeoutChange = function () {
    selectTimein.value = selectTimeout.value;
  };

  var renderInitialStateCapacity = function () {
    capacityOptions.forEach(function (option) {
      if (option.value !== '1') {
        option.disabled = true;
      }
    });
  };

  var getCurrentRule = function (rules) {
    return rules.find(function (ruleRoom) {
      return ruleRoom.roomNumber === roomNumber.value;
    }) || {roomNumber: '', capacityValues: []};
  };

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

  var cleanSelect = function () {
    Array.from(selectList).forEach(function (select) {
      var currentValue = select.querySelector('option[selected]');
      select.value = currentValue.value;

      renderInitialStateCapacity();
    });
  };

  var cleanFields = function () {
    adForm.reset();
    cleanSelect();
    window.previewImages.cleanImgChooser();

    renderAddress(MainPinActive);
  };

  var onResetButton = function (evt) {
    evt.preventDefault();

    window.main.disablePage();
    cleanFields();
    window.card.hideCard();
  };

  var renderSuccessMessage = function () {
    tagMain.appendChild(successMessage);
  };

  var renderErrorMessage = function () {
    tagMain.appendChild(errorMessage);
  };

  var onSuccessMessageEscPress = function (evt) {
    window.formMessage.onFormMessageEscPress(evt, successMessage);
  };

  var onSuccessMessageMousePress = function (evt) {
    window.formMessage.onFormMessageMousePress(evt, successMessage);
  };

  var onErrorMessageEscPress = function (evt) {
    window.formMessage.onFormMessageEscPress(evt, errorMessage);
  };

  var onErrorMessageMousePress = function (evt) {
    window.formMessage.onFormMessageMousePress(evt, errorMessage);
  };

  var onPublish = function () {
    renderSuccessMessage();

    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageMousePress);

    window.main.disablePage();
    cleanFields();
    window.card.hideCard();

    Array.from(window.main.mapPinList).forEach(function (pin) {
      if (!pin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.MAIN_PIN))) {
        window.pinsList.mapPins.removeChild(pin);
      }
    });
  };

  inputTitle.addEventListener('invalid', inputTitleInvalid);
  inputTitle.addEventListener('input', inputTitleInput);
  selectType.addEventListener('change', selectTypeChange);
  selectTimein.addEventListener('change', selectTimeinChange);
  selectTimeout.addEventListener('change', selectTimeoutChange);
  roomNumber.addEventListener('change', onRoomNumberChange);
  capacity.addEventListener('change', onCapacityChange);
  resetButton.addEventListener('click', onResetButton);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.publish(new FormData(adForm), onPublish, window.error.onErrorPost);

    document.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('click', onSuccessMessageMousePress);
    document.removeEventListener('keydown', onErrorMessageEscPress);
    document.removeEventListener('click', onErrorMessageMousePress);
  });

  window.form = {
    adForm: adForm,
    tagMain: tagMain,
    mapPinMain: mapPinMain,
    MainPinActive: MainPinActive,
    MainPinDisabled: MainPinDisabled,
    disableFields: disableFields,
    activateFields: activateFields,
    renderAddress: renderAddress,
    onErrorMessageEscPress: onErrorMessageEscPress,
    onErrorMessageMousePress: onErrorMessageMousePress,
    renderErrorMessage: renderErrorMessage
  };
})();
