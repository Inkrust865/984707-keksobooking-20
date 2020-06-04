'use strict';

(function () {
  var BOOKING_COUNT = 8;
  var KEYS = ['title', 'type', 'checkin', 'checkout', 'description'];
  var TITLES = ['Квартира с камином', 'Дом с садом', 'Дом, можно с питомцами', 'Уютная квартира в центре Токио', 'Дом с парковкой'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
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

  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var showMap = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };

  var getRandomNumber = function (number) {
    return Math.floor(Math.random() * number);
  };

  var getRandomCeilNumber = function (number) {
    return Math.ceil(Math.random() * number);
  };

  var getAvatar = function (index) {
    var avatarAddress = 'img/avatars/user0' + (index + 1) + '.png';
    return avatarAddress;
  };

  var getAuthor = function (index) {
    var author = {};
    author.avatar = getAvatar(index);
    return author;
  };

  var getOfferParameter = function (array) {
    var randomIndex = getRandomNumber(array.length);
    var parameterValue = array[randomIndex];
    return parameterValue;
  };

  var mixElements = function (array) {
    var j;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
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

    offer.price = getRandomNumber(50000);
    offer.rooms = getRandomCeilNumber(4);
    offer.guests = getRandomCeilNumber(6);

    offer.features = getOfferElements(FEATURES);
    offer.photos = getOfferElements(PHOTOS);

    return offer;
  };

  var getLocationX = function () {
    var locationX = getRandomNumber(MapCity.WIDTH - Pin.X) + 'px';
    return locationX;
  };

  var getLocationY = function () {
    var mapHeight = MapCity.MAX_Y - MapCity.MIN_Y;
    var locationYNumber = getRandomNumber(mapHeight - Pin.Y) + MapCity.MIN_Y;
    var locationY = locationYNumber + 'px';
    return locationY;
  };

  var getLocation = function (index) {
    var location = {};
    location.x = getLocationX(index);
    location.y = getLocationY(index);

    return location;
  };

  var renderBooking = function (index) {
    var bookingPin = mapPinTemplate.cloneNode(true);

    bookingPin.querySelector('img').src = getAvatar(index);
    bookingPin.querySelector('img').alt = 'Заголовок объявления';
    bookingPin.style.left = getLocationX(index);
    bookingPin.style.top = getLocationY(index);

    return bookingPin;
  };

  var renderFragment = function () {
    var fragment = document.createDocumentFragment();
    var BookingList = [];
    for (var i = 0; i < BOOKING_COUNT; i++) {
      BookingList[i] = {};
      BookingList[i].author = getAuthor(i);
      BookingList[i].offer = getOffer();
      BookingList[i].location = getLocation();

      fragment.appendChild(renderBooking(i));
    }

    return fragment;
  };

  showMap();
  mapPins.appendChild(renderFragment());
})();
