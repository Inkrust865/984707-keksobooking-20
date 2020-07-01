'use strict';

(function () {
  var mapPinBorderRight = window.mapFile.map.clientWidth - window.form.MainPinActive.X;
  var mapPinBorderLeft = -(window.form.MainPinActive.X);
  var MapCity = {
    MIN_Y: 130,
    MAX_Y: 630
  };
  var mapPinBorderTop = MapCity.MIN_Y - window.form.MainPinActive.Y;
  var mapPinBorderBottom = MapCity.MAX_Y - window.form.MainPinActive.Y;

  window.form.mapPinMain.addEventListener('mousedown', function (evt) {
    window.main.onMainPinFirstPress(evt);
    evt.preventDefault();

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

      var newX = window.form.mapPinMain.offsetLeft - shift.x;
      var newY = window.form.mapPinMain.offsetTop - shift.y;

      if (newX >= mapPinBorderLeft && newX <= mapPinBorderRight && newY >= mapPinBorderTop && newY <= mapPinBorderBottom) {
        window.form.mapPinMain.style.left = newX + 'px';
        window.form.mapPinMain.style.top = newY + 'px';
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
})();
