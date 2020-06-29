'use strict';

(function () {
  var mapPins = document.querySelector(window.ClassNames.mapPins);
  var mainTag = document.querySelector('main');
  var mapPinBorderRight = mainTag.offsetLeft + window.mapFile.map.clientWidth - (window.form.mapPinMain.clientWidth / 2);
  var mapPinBorderLeft = mainTag.offsetLeft + (window.form.mapPinMain.clientWidth / 2);
  var MapCity = {
    MIN_Y: 130,
    MAX_Y: 630
  };
  var mapPinBorderTop = MapCity.MIN_Y;
  var mapPinBorderBottom = MapCity.MAX_Y - window.form.MainPinActive.Y;

  var activatePage = function () {
    window.mapFile.showMap();
    mapPins.appendChild(window.mapFile.renderFragment());
    window.mapFile.map.insertBefore(window.card.renderCard(), window.mapFile.map.querySelector(window.ClassNames.filtersContainer));

    window.form.adForm.classList.remove(window.util.getClassWithoutPoint(window.ClassNames.adFormDisabled));
    window.form.activateFields(window.form.adForm);
    window.form.activateFields(window.mapFile.mapFilters);

    window.form.renderAddress(window.form.MainPinActive);
  };

  var disablePage = function () {
    window.form.disableFields(window.form.adForm);
    window.form.disableFields(window.mapFile.mapFilters);

    window.form.renderAddress(window.form.MainPinDisabled);
  };

  window.form.mapPinMain.addEventListener('mousedown', function (evt) {
    if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
      if (evt.button === 0) {
        activatePage(evt);
      }
    }

    evt.preventDefault();

    var scroll = window.pageYOffset;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (startCoords.x > mapPinBorderLeft && startCoords.x < mapPinBorderRight) {
        window.form.mapPinMain.style.left = (window.form.mapPinMain.offsetLeft - shift.x) + 'px';

        if (startCoords.y > mapPinBorderTop - scroll && startCoords.y < mapPinBorderBottom - scroll) {
          window.form.mapPinMain.style.top = (window.form.mapPinMain.offsetTop - shift.y) + 'px';
        }
      } else {
        window.form.mapPinMain.style.top = window.form.mapPinMain.offsetTop + 'px';
        window.form.mapPinMain.style.left = window.form.mapPinMain.offsetLeft + 'px';
      }

      window.form.renderAddress(window.form.MainPinActive);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.form.mapPinMain.removeEventListener('click', onClickPreventDefault);
        };

        window.form.mapPinMain.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.form.mapPinMain.addEventListener('keydown', function (evt) {
    if (window.mapFile.map.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mapFaded))) {
      window.util.onEnterPress(evt, activatePage);
    }
  });

  disablePage();
})();
