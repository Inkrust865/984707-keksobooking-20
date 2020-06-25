'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var KEY_VALUES = [window.data.TITLES, window.data.TYPES, window.data.CHECKIN, window.data.CHECKOUT, window.data.DESCRIPTIONS];

  var getOfferParameter = function (keyValues) {
    var randomIndex = window.util.getRandomNumber(keyValues.length);
    return keyValues[randomIndex];
  };

  var getOfferElements = function (parameterValues) {
    var randomArray = window.util.mixElements(parameterValues);
    var arrayLength = window.util.getRandomCeilNumber(randomArray.length);
    var parameterRandomValues = [];
    for (var i = 0; i < arrayLength; i++) {
      var parameterValue = randomArray[i];
      parameterRandomValues[i] = parameterValue;
    }
    return parameterRandomValues;
  };

  var getOffer = function () {
    var offer = {};
    for (var i = 0; i < window.data.KEYS.length; i++) {
      offer[window.data.KEYS[i]] = getOfferParameter(KEY_VALUES[i]);
    }
    offer.address = window.mapFile.getLocationX() + ', ' + window.mapFile.getLocationY();
    offer.price = window.util.getRandomNumber(50000);
    offer.rooms = window.util.getRandomCeilNumber(4);
    offer.guests = window.util.getRandomCeilNumber(6);
    offer.features = getOfferElements(window.data.FEATURES);
    offer.photos = getOfferElements(window.data.PHOTOS);
    return offer;
  };

  window.util = {
    getClassWithoutPoint: function (className) {
      return className.slice(1);
    },
    getRandomNumber: function (max) {
      return Math.floor(Math.random() * max);
    },
    getRandomCeilNumber: function (max) {
      return Math.ceil(Math.random() * max);
    },
    mixElements: function (array) {
      for (var i = array.length - 1, j, temp; i > 0; i--) {
        j = window.util.getRandomNumber(i + 1);
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }

      return array;
    },
    onEnterPress: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getAvatar: function (index) {
      return 'img/avatars/user0' + (index + 1) + '.png';
    },
    getAuthor: function (index) {
      return {
        avatar: window.util.getAvatar(index)
      };
    },
    getBookingList: function () {
      var BookingList = [];

      for (var i = 0; i < window.data.BOOKING_COUNT; i++) {
        BookingList[i] = {};
        BookingList[i].author = window.util.getAuthor(i);
        BookingList[i].offer = getOffer();
        BookingList[i].location = window.mapFile.getLocation();
      }

      return BookingList;
    },
    hideTextParameter: function (firstOffer, pinCard) {
      var cardFields = ['title', 'text--address', 'text--price', 'type', 'description', 'avatar'];
      var offerTextParameters = [firstOffer.offer.title, firstOffer.offer.address, firstOffer.offer.price, firstOffer.offer.type,
        firstOffer.offer.description, firstOffer.author.avatar];

      for (var i = 0; i < offerTextParameters.length; i++) {
        if (!offerTextParameters[i]) {
          pinCard.querySelector('.popup__' + cardFields[i]).classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));
        }
      }
    },
    hideDoubleParameter: function (firstOffer, pinCard) {
      var offerDoubleParameters = [
        {
          parameters: [firstOffer.offer.rooms, firstOffer.offer.guests],
          className: window.ClassNames.popupCapacity
        },
        {
          parameters: [firstOffer.offer.checkin, firstOffer.offer.checkout],
          className: window.ClassNames.popupTime
        }
      ];

      offerDoubleParameters.forEach(function (it) {
        it.parameters.forEach(function (parameter) {
          if (!parameter) {
            pinCard.querySelector(it.className).classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));
          }
        });
      });
    },
    hideListParameter: function (firstOffer, pinCard) {
      var offerListParameters = [firstOffer.offer.features, firstOffer.offer.photos];
      var classesListParameters = [window.ClassNames.popupFeatures, window.ClassNames.popupPhotos];

      for (var i = 0; i < offerListParameters.length; i++) {
        if (offerListParameters[i].length === 0) {
          pinCard.querySelector(classesListParameters[i]).classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));
        }
      }
    }
  };
})();
