'use strict';

(function () {
  window.card = {
    renderCard: function (index) {
      var pinCard = mapCardTemplate.cloneNode(true);
      var chosenOffer = window.updatePinsList.newPinsList[index - 1];

      pinCard.querySelector(window.ClassNames.popupTitle).textContent = chosenOffer.offer.title;
      pinCard.querySelector(window.ClassNames.popupAddress).textContent = chosenOffer.offer.address;
      pinCard.querySelector(window.ClassNames.popupPrice).textContent = chosenOffer.offer.price + '₽/ночь';
      renderType(chosenOffer.offer.type, pinCard);
      pinCard.querySelector(window.ClassNames.popupCapacity).textContent = chosenOffer.offer.rooms + ' комнаты для ' + chosenOffer.offer.guests + ' гостей';
      pinCard.querySelector(window.ClassNames.popupTime).textContent = 'Заезд после ' + chosenOffer.offer.checkin + ', выезд до ' + chosenOffer.offer.checkout;
      renderFeatures(chosenOffer.offer.features, pinCard);
      pinCard.querySelector(window.ClassNames.popupDescription).textContent = chosenOffer.offer.description;
      renderPhotos(chosenOffer.offer.photos, pinCard);
      pinCard.querySelector(window.ClassNames.popupAvatar).src = chosenOffer.author.avatar;

      window.util.hideTextParameter(chosenOffer, pinCard);
      window.util.hideDoubleParameter(chosenOffer, pinCard);
      window.util.hideListParameter(chosenOffer, pinCard);

      return pinCard;
    },
    openCard: function (index) {
      if (document.querySelector(window.ClassNames.mapCard)) {
        window.card.closeCard();
        window.card.cardClose.removeEventListener('click', window.card.onCardClosePress);
        document.removeEventListener('keydown', window.card.closeCardEscPress);
      }

      window.mapFile.map.insertBefore(window.card.renderCard(index), window.mapFile.map.querySelector(window.ClassNames.filtersContainer));

      var mapCard = document.querySelector(window.ClassNames.mapCard);
      window.card.cardClose = document.querySelector(window.ClassNames.popupClose);

      window.card.closeCard = function () {
        window.mapFile.map.removeChild(mapCard);
      };

      window.card.onCardClosePress = function () {
        window.card.closeCard();
        window.card.cardClose.removeEventListener('click', window.card.onCardClosePress);
        document.removeEventListener('keydown', window.card.closeCardEscPress);
      };

      window.card.closeCardEscPress = function (evt) {
        window.util.onEscPress(evt, function () {
          window.card.closeCard();
          window.card.cardClose.removeEventListener('click', window.card.onCardClosePress);
          document.removeEventListener('keydown', window.card.closeCardEscPress);
        });
      };

      window.card.cardClose.addEventListener('click', window.card.onCardClosePress);
      document.addEventListener('keydown', window.card.closeCardEscPress);
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
