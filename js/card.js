'use strict';

(function () {
  window.card = {
    renderCard: function () {
      var pinCard = mapCardTemplate.cloneNode(true);
      var firstOffer = window.data.getBookingList()[0];

      pinCard.querySelector(window.ClassNames.popupTitle).textContent = firstOffer.offer.title;
      pinCard.querySelector(window.ClassNames.popupAddress).textContent = firstOffer.offer.address;
      pinCard.querySelector(window.ClassNames.popupPrice).textContent = firstOffer.offer.price + '₽/ночь';
      renderType(firstOffer.offer.type, pinCard);
      pinCard.querySelector(window.ClassNames.popupCapacity).textContent = firstOffer.offer.rooms + ' комнаты для ' + firstOffer.offer.guests + ' гостей';
      pinCard.querySelector(window.ClassNames.popupTime).textContent = 'Заезд после ' + firstOffer.offer.checkin + ', выезд до ' + firstOffer.offer.checkout;
      renderFeatures(firstOffer.offer.features, pinCard);
      pinCard.querySelector(window.ClassNames.popupDescription).textContent = firstOffer.offer.description;
      renderPhotos(firstOffer.offer.photos, pinCard);
      pinCard.querySelector(window.ClassNames.popupAvatar).src = firstOffer.author.avatar;

      hideTextParameter(firstOffer, pinCard);
      hideDoubleParameter(firstOffer, pinCard);
      hideListParameter(firstOffer, pinCard);

      return pinCard;
    }
  };
  var cardPhotoTemplate = document.querySelector('#card')
    .content
    .querySelector(window.ClassNames.popupPhoto);
  var mapCardTemplate = document.querySelector('#card')
    .content
    .querySelector(window.ClassNames.mapCard);

  var renderType = function (type, card) {
    var typeCard = card.querySelector(window.ClassNames.popupType);
    getType(typeCard, type);
  };

  var getType = function (typeOffer, type) {
    for (var i = 0; i < window.data.TYPES.length; i++) {
      for (var j = 0; j < window.data.RUSSIAN_TYPES.length; j++) {
        if (type === window.data.TYPES[i] && i === j) {
          typeOffer.textContent = window.data.RUSSIAN_TYPES[j];
        }
      }
    }
  };

  var renderPhoto = function (index, cardPhotos) {
    var photo = cardPhotoTemplate.cloneNode(true);
    photo.src = cardPhotos[index];

    return photo;
  };

  var renderPhotos = function (cardPhotos, card) {
    var photos = card.querySelector(window.ClassNames.popupPhotos);
    //  удаляю элемент, потому что был в исходнике
    photos.removeChild(photos.children[0]);

    for (var i = 0; i < cardPhotos.length; i++) {
      photos.appendChild(renderPhoto(i, cardPhotos));
    }
  };

  var renderFeatures = function (cardFeatures, card) {
    var features = card.querySelectorAll(window.ClassNames.popupFeature);

    features.forEach(function (element) {
      element.classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));
    });

    features.forEach(function (element) {
      for (var i = 0; i < cardFeatures.length; i++) {
        if (element.classList.contains('popup__feature--' + cardFeatures[i])) {
          element.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.hidden));
        }
      }
    });
  };

  var hideTextParameter = function (firstOffer, pinCard) {
    var cardFields = ['title', 'text--address', 'text--price', 'type', 'description', 'avatar'];
    var offerTextParameters = [firstOffer.offer.title, firstOffer.offer.address, firstOffer.offer.price, firstOffer.offer.type,
      firstOffer.offer.description, firstOffer.author.avatar];

    for (var i = 0; i < offerTextParameters.length; i++) {
      if (!offerTextParameters[i]) {
        pinCard.querySelector('.popup__' + cardFields[i]).classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));
      }
    }
  };

  var hideDoubleParameter = function (firstOffer, pinCard) {
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
  };

  var hideListParameter = function (firstOffer, pinCard) {
    var offerListParameters = [firstOffer.offer.features, firstOffer.offer.photos];
    var classesListParameters = [window.ClassNames.popupFeatures, window.ClassNames.popupPhotos];

    for (var i = 0; i < offerListParameters.length; i++) {
      if (offerListParameters[i].length === 0) {
        pinCard.querySelector(classesListParameters[i]).classList.add(window.util.getClassWithoutPoint(window.ClassNames.hidden));
      }
    }
  };
})();
