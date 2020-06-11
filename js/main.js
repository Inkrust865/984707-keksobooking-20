'use strict';

(function () {
  var BOOKING_COUNT = 8;
  var KEYS = ['title', 'type', 'checkin', 'checkout', 'description'];
  var TITLES = ['Квартира с камином', 'Дом с садом', 'Дом, можно с питомцами', 'Уютная квартира в центре Токио', 'Дом с парковкой'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var RUSSIAN_TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Коммунальные услуги входят в стоимость', 'Въезд с животными запрещен', 'С видом на парк', 'Уютное жилье в традиционном стиле',
    'Квартира с европейским ремонтом', 'Квартира полностью укомплектована'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var KEY_VALUES = [TITLES, TYPES, CHECKIN, CHECKOUT, DESCRIPTIONS];
  var Pin = {
    X: 25,
    Y: 70
  };
  var MapCity = {
    WIDTH: document.querySelector('.map__overlay').clientWidth,
    MIN_Y: 130,
    MAX_Y: 630
  };
  var mapHeight = MapCity.MAX_Y - MapCity.MIN_Y;

  var ClassNames = {
    popupType: '.popup__type',
    popupPhotos: '.popup__photos',
    popupFeature: '.popup__feature',
    popupFeatures: '.popup__features',
    popupTitle: '.popup__title',
    popupAddress: '.popup__text--address',
    popupPrice: '.popup__text--price',
    popupCapacity: '.popup__text--capacity',
    popupTime: '.popup__text--time',
    popupDescription: '.popup__description',
    popupAvatar: '.popup__avatar',
    filtersContainer: '.map__filters-container'
  };

  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');
  var cardPhotoTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup__photo');

  var showMap = function () {
    map.classList.remove('map--faded');
  };

  var getRandomNumber = function (max) {
    return Math.floor(Math.random() * max);
  };

  var getRandomCeilNumber = function (max) {
    return Math.ceil(Math.random() * max);
  };

  var getAvatar = function (index) {
    return 'img/avatars/user0' + (index + 1) + '.png';
  };

  var getAuthor = function (index) {
    return {
      avatar: getAvatar(index)
    };
  };

  var getOfferParameter = function (array) {
    var randomIndex = getRandomNumber(array.length);

    return array[randomIndex];
  };

  var mixElements = function (array) {
    for (var i = array.length - 1, j, temp; i > 0; i--) {
      j = getRandomNumber(i + 1);
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }

    return array;
  };

  var getOfferElements = function (array) {
    var randomArray = mixElements(array);
    var arrayLength = getRandomCeilNumber(randomArray.length);
    var parameterRandomValues = [];

    for (var i = 0; i < arrayLength; i++) {
      var parameterValue = randomArray[i];
      parameterRandomValues[i] = parameterValue;
    }

    return parameterRandomValues;
  };

  var getOffer = function () {
    var offer = {};

    for (var i = 0; i < KEYS.length; i++) {
      offer[KEYS[i]] = getOfferParameter(KEY_VALUES[i]);
    }

    offer.address = getLocationX() + ', ' + getLocationY();

    offer.price = getRandomNumber(50000);
    offer.rooms = getRandomCeilNumber(4);
    offer.guests = getRandomCeilNumber(6);

    offer.features = getOfferElements(FEATURES);
    offer.photos = getOfferElements(PHOTOS);

    return offer;
  };

  var getLocationX = function () {
    return getRandomNumber(MapCity.WIDTH - Pin.X);
  };

  var getLocationY = function () {
    return getRandomNumber(mapHeight - Pin.Y) + MapCity.MIN_Y;
  };

  var getLocation = function () {
    return {
      x: getLocationX(),
      y: getLocationY()
    };
  };

  var getBookingList = function () {
    var BookingList = [];

    for (var i = 0; i < BOOKING_COUNT; i++) {
      BookingList[i] = {};
      BookingList[i].author = getAuthor(i);
      BookingList[i].offer = getOffer();
      BookingList[i].location = getLocation();
    }

    return BookingList;
  };

  var renderBooking = function (index) {
    var bookingPin = mapPinTemplate.cloneNode(true);
    var pinImg = bookingPin.querySelector('img');

    pinImg.src = getAvatar(index);
    pinImg.alt = 'Заголовок объявления';
    bookingPin.style.left = getLocationX() + 'px';
    bookingPin.style.top = getLocationY() + 'px';

    return bookingPin;
  };

  var renderType = function (type, card) {
    var typeCard = card.querySelector(ClassNames.popupType);
    getType(typeCard, type);
  };

  var getType = function (typeOffer, type) {
    for (var i = 0; i < TYPES.length; i++) {
      for (var j = 0; j < RUSSIAN_TYPES.length; j++) {
        if (type === TYPES[i] && i === j) {
          typeOffer.textContent = RUSSIAN_TYPES[j];
        }
      }
    }
  };

  var renderPhoto = function (index, array) {
    var photo = cardPhotoTemplate.cloneNode(true);
    photo.src = array[index];

    return photo;
  };

  var renderPhotos = function (array, card) {
    var photos = card.querySelector(ClassNames.popupPhotos);
    //  удаляю элемент, потому что был в исходнике
    photos.removeChild(photos.children[0]);

    for (var i = 0; i < array.length; i++) {
      photos.appendChild(renderPhoto(i, array));
    }
  };

  var renderFeatures = function (array, card) {
    var features = card.querySelectorAll(ClassNames.popupFeature);

    features.forEach(function (element) {
      element.classList.add('hidden');
    });

    features.forEach(function (element) {
      for (var i = 0; i < array.length; i++) {
        if (element.classList.contains('popup__feature--' + array[i])) {
          element.classList.remove('hidden');
        }
      }
    });
  };

  var hideTextParameter = function (firstOffer, pinCard) {
    var cardFields = ['title', 'text--address', 'text--price', 'type', 'description', 'avatar'];
    var offerTextParameters = [firstOffer.offer.title, firstOffer.offer.address, firstOffer.offer.price, firstOffer.offer.type,
      firstOffer.offer.description, firstOffer.author.avatar];

    for (var i = 0; i < offerTextParameters.length; i++) {
      if (offerTextParameters[i] === '') {
        pinCard.querySelector('.popup__' + cardFields[i]).classList.add('hidden');
      }
    }
  };

  var hideDoubleParameter = function (firstOffer, pinCard) {
    var offerDoubleParameters = [firstOffer.offer.rooms, firstOffer.offer.guests, firstOffer.offer.checkin, firstOffer.offer.checkout];

    if (offerDoubleParameters[0] === '' || offerDoubleParameters[1] === '') {
      pinCard.querySelector(ClassNames.popupCapacity).classList.add('hidden');
    }

    if (offerDoubleParameters[2] === '' || offerDoubleParameters[3] === '') {
      pinCard.querySelector(ClassNames.popupTime).classList.add('hidden');
    }
  };

  var hideListParameter = function (firstOffer, pinCard) {
    var offerListParameters = [firstOffer.offer.features, firstOffer.offer.photos];
    var classesListParameters = [ClassNames.popupFeatures, ClassNames.popupPhotos];

    for (var i = 0; i < offerListParameters.length; i++) {
      if (offerListParameters[i].length === 0) {
        pinCard.querySelector(classesListParameters[i]).classList.add('hidden');
      }
    }
  };

  var renderCard = function () {
    var pinCard = mapCardTemplate.cloneNode(true);
    var firstOffer = getBookingList()[0];

    pinCard.querySelector(ClassNames.popupTitle).textContent = firstOffer.offer.title;
    pinCard.querySelector(ClassNames.popupAddress).textContent = firstOffer.offer.address;
    pinCard.querySelector(ClassNames.popupPrice).textContent = firstOffer.offer.price + '₽/ночь';
    renderType(firstOffer.offer.type, pinCard);
    pinCard.querySelector(ClassNames.popupCapacity).textContent = firstOffer.offer.rooms + ' комнаты для ' + firstOffer.offer.guests + ' гостей';
    pinCard.querySelector(ClassNames.popupTime).textContent = 'Заезд после ' + firstOffer.offer.checkin + ', выезд до ' + firstOffer.offer.checkout;
    renderFeatures(firstOffer.offer.features, pinCard);
    pinCard.querySelector(ClassNames.popupDescription).textContent = firstOffer.offer.description;
    renderPhotos(firstOffer.offer.photos, pinCard);
    pinCard.querySelector(ClassNames.popupAvatar).src = firstOffer.author.avatar;

    hideTextParameter(firstOffer, pinCard);
    hideDoubleParameter(firstOffer, pinCard);
    hideListParameter(firstOffer, pinCard);

    return pinCard;
  };

  var renderFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < BOOKING_COUNT; i++) {
      fragment.appendChild(renderBooking(i));
    }

    return fragment;
  };

  showMap();
  mapPins.appendChild(renderFragment());
  map.insertBefore(renderCard(), map.querySelector(ClassNames.filtersContainer));
})();
