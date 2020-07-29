'use strict';

(function () {
  var typesList = [
    {engVersion: 'palace', rusVersion: 'Дворец'},
    {engVersion: 'flat', rusVersion: 'Квартира'},
    {engVersion: 'house', rusVersion: 'Дом'},
    {engVersion: 'bungalo', rusVersion: 'Бунгало'}
  ];

  var cardPhotoTemplate = document.querySelector('#card')
    .content
    .querySelector(window.ClassNames.POPUP_PHOTO);
  var mapCardTemplate = document.querySelector('#card')
    .content
    .querySelector(window.ClassNames.MAP_CARD);
  var filtersContainer = window.mapFile.map.querySelector(window.ClassNames.FILTERS_CONTAINER);
  var mapCard;
  var onCardClosePress;
  var closeCardEscPress;
  var cardClose;

  var renderType = function (type, card) {
    var typeCard = card.querySelector(window.ClassNames.POPUP_TYPE);
    getType(typeCard, type);
  };

  var getType = function (typeOffer, type) {
    typesList.forEach(function (typeValue) {
      if (type === typeValue.engVersion) {
        typeOffer.textContent = typeValue.rusVersion;
      }
    });
  };

  var renderPhoto = function (index, cardPhotos) {
    var photo = cardPhotoTemplate.cloneNode(true);
    photo.src = cardPhotos[index];

    return photo;
  };

  var renderPhotos = function (cardPhotos, card) {
    var photos = card.querySelector(window.ClassNames.POPUP_PHOTOS);
    //  удаляю элемент, потому что был в исходнике
    photos.removeChild(photos.children[0]);

    for (var i = 0; i < cardPhotos.length; i++) {
      photos.appendChild(renderPhoto(i, cardPhotos));
    }
  };

  var renderFeatures = function (cardFeatures, card) {
    var features = card.querySelectorAll(window.ClassNames.POPUP_FEATURE);

    features.forEach(function (element) {
      element.classList.add(window.util.getClassWithoutPoint(window.ClassNames.HIDDEN));
    });

    features.forEach(function (element) {
      for (var i = 0; i < cardFeatures.length; i++) {
        if (element.classList.contains('popup__feature--' + cardFeatures[i])) {
          element.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.HIDDEN));
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
        pinCard.querySelector('.popup__' + cardFields[i]).classList.add(window.util.getClassWithoutPoint(window.ClassNames.HIDDEN));
      }
    }
  };

  var hideDoubleParameter = function (firstOffer, pinCard) {
    var offerDoubleParameters = [
      {
        parameters: [firstOffer.offer.rooms, firstOffer.offer.guests],
        className: window.ClassNames.POPUP_CAPACITY
      },
      {
        parameters: [firstOffer.offer.checkin, firstOffer.offer.checkout],
        className: window.ClassNames.POPUP_TIME
      }
    ];
    offerDoubleParameters.forEach(function (it) {
      it.parameters.forEach(function (parameter) {
        if (!parameter) {
          pinCard.querySelector(it.className).classList.add(window.util.getClassWithoutPoint(window.ClassNames.HIDDEN));
        }
      });
    });
  };

  var hideListParameter = function (firstOffer, pinCard) {
    var offerListParameters = [firstOffer.offer.features, firstOffer.offer.photos];
    var classesListParameters = [window.ClassNames.POPUP_FEATURES, window.ClassNames.POPUP_PHOTOS];
    for (var i = 0; i < offerListParameters.length; i++) {
      if (offerListParameters[i].length === 0) {
        pinCard.querySelector(classesListParameters[i]).classList.add(window.util.getClassWithoutPoint(window.ClassNames.HIDDEN));
      }
    }
  };

  var renderCard = function (index) {
    var pinCard = mapCardTemplate.cloneNode(true);
    var chosenOffer = window.pinsList.newPinsList[index - 1];

    pinCard.querySelector(window.ClassNames.POPUP_TITLE).textContent = chosenOffer.offer.title;
    pinCard.querySelector(window.ClassNames.POPUP_ADDRESS).textContent = chosenOffer.offer.address;
    pinCard.querySelector(window.ClassNames.POPUP_PRICE).textContent = chosenOffer.offer.price + '₽/ночь';
    renderType(chosenOffer.offer.type, pinCard);
    pinCard.querySelector(window.ClassNames.POPUP_CAPACITY).textContent = chosenOffer.offer.rooms + ' комнаты для ' + chosenOffer.offer.guests + ' гостей';
    pinCard.querySelector(window.ClassNames.POPUP_TIME).textContent = 'Заезд после ' + chosenOffer.offer.checkin + ', выезд до ' + chosenOffer.offer.checkout;
    renderFeatures(chosenOffer.offer.features, pinCard);
    pinCard.querySelector(window.ClassNames.POPUP_DESCRIPTION).textContent = chosenOffer.offer.description;
    renderPhotos(chosenOffer.offer.photos, pinCard);
    pinCard.querySelector(window.ClassNames.POPUP_AVATAR).src = chosenOffer.author.avatar;

    hideTextParameter(chosenOffer, pinCard);
    hideDoubleParameter(chosenOffer, pinCard);
    hideListParameter(chosenOffer, pinCard);

    return pinCard;
  };

  var closeCard = function (card) {
    window.mapFile.map.removeChild(card);
  };

  var openCard = function (index) {
    if (document.querySelector(window.ClassNames.MAP_CARD)) {
      closeCard(mapCard);
      document.removeEventListener('keydown', closeCardEscPress);
    }

    window.mapFile.map.insertBefore(window.card.renderCard(index), filtersContainer);

    mapCard = window.mapFile.map.querySelector(window.ClassNames.MAP_CARD);
    cardClose = mapCard.querySelector(window.ClassNames.POPUP_CLOSE);

    onCardClosePress = function () {
      closeCard(mapCard);
      document.removeEventListener('keydown', closeCardEscPress);
    };

    closeCardEscPress = function (evt) {
      window.util.onEscPress(evt, function () {
        closeCard(mapCard);
        document.removeEventListener('keydown', closeCardEscPress);
      });
    };

    cardClose.addEventListener('click', onCardClosePress);
    document.addEventListener('keydown', closeCardEscPress);
  };

  var hideCard = function () {
    mapCard = window.mapFile.map.querySelector(window.ClassNames.MAP_CARD);
    if (!mapCard) {
      return;
    } else {
      closeCard(mapCard);
      document.removeEventListener('keydown', closeCardEscPress);
    }
  };

  window.card = {
    renderCard: renderCard,
    openCard: openCard,
    hideCard: hideCard
  };
})();
