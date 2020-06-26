'use strict';

(function () {
  window.card = {
    renderCard: function () {
      var pinCard = mapCardTemplate.cloneNode(true);
      var firstOffer = window.util.getBookingList()[0];

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

      window.util.hideTextParameter(firstOffer, pinCard);
      window.util.hideDoubleParameter(firstOffer, pinCard);
      window.util.hideListParameter(firstOffer, pinCard);

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
})();
