'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    BookingList: [],
    getClassWithoutPoint: function (className) {
      return className.slice(1);
    },
    getRandomNumber: function (max) {
      return Math.floor(Math.random() * max);
    },
    getRandomCeilNumber: function (max) {
      return Math.ceil(Math.random() * max);
    },
    onEscPress: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        action();
      }
    },
    onEnterPress: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
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
