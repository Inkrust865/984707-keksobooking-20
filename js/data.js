'use strict';

(function () {
  window.data = {
    BOOKING_COUNT: 8,
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    RUSSIAN_TYPES: ['Дворец', 'Квартира', 'Дом', 'Бунгало'],
    getAvatar: function (index) {
      return 'img/avatars/user0' + (index + 1) + '.png';
    },
    getLocationX: function () {
      return window.util.getRandomNumber(MapCity.WIDTH - Pin.X);
    },
    getLocationY: function () {
      return window.util.getRandomNumber(mapHeight - Pin.Y) + MapCity.MIN_Y;
    },
    getBookingList: function () {
      var BookingList = [];

      for (var i = 0; i < window.data.BOOKING_COUNT; i++) {
        BookingList[i] = {};
        BookingList[i].author = getAuthor(i);
        BookingList[i].offer = getOffer();
        BookingList[i].location = getLocation();
      }

      return BookingList;
    }
  };
  var KEYS = ['title', 'type', 'checkin', 'checkout', 'description'];
  var TITLES = ['Квартира с камином', 'Дом с садом', 'Дом, можно с питомцами', 'Уютная квартира в центре Токио', 'Дом с парковкой'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Коммунальные услуги входят в стоимость', 'Въезд с животными запрещен', 'С видом на парк', 'Уютное жилье в традиционном стиле',
    'Квартира с европейским ремонтом', 'Квартира полностью укомплектована'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var KEY_VALUES = [TITLES, window.data.TYPES, CHECKIN, CHECKOUT, DESCRIPTIONS];
  var Pin = {
    X: 25,
    Y: 70
  };
  var MapCity = {
    WIDTH: document.querySelector(window.ClassNames.mapOverlay).clientWidth,
    MIN_Y: 130,
    MAX_Y: 630
  };
  var mapHeight = MapCity.MAX_Y - MapCity.MIN_Y;

  var getAuthor = function (index) {
    return {
      avatar: window.data.getAvatar(index)
    };
  };

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

    for (var i = 0; i < KEYS.length; i++) {
      offer[KEYS[i]] = getOfferParameter(KEY_VALUES[i]);
    }

    offer.address = window.data.getLocationX() + ', ' + window.data.getLocationY();

    offer.price = window.util.getRandomNumber(50000);
    offer.rooms = window.util.getRandomCeilNumber(4);
    offer.guests = window.util.getRandomCeilNumber(6);

    offer.features = getOfferElements(FEATURES);
    offer.photos = getOfferElements(PHOTOS);

    return offer;
  };

  var getLocation = function () {
    return {
      x: window.data.getLocationX(),
      y: window.data.getLocationY()
    };
  };
})();
