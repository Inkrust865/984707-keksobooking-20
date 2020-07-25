'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.chooseImages = {
    avatarChooser: document.querySelector('.ad-form__field input[type="file"]'),
    housingChooser: document.querySelector('.ad-form__upload input[type="file"]'),
    housingPreviewBlock: document.querySelector('.ad-form__photo')
  };

  window.chooseImages.avatarChooser.addEventListener('change', function () {
    window.chooseImages.avatarPreview = document.querySelector('.ad-form-header__preview img');
    var avatar = window.chooseImages.avatarChooser.files[0];
    var avatarName = avatar.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return avatarName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.chooseImages.avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });

  window.chooseImages.housingChooser.addEventListener('change', function () {
    if (!window.chooseImages.housingPreviewBlock.querySelector('img')) {
      window.chooseImages.housingPreview = document.createElement('img');
      window.chooseImages.housingPreview.width = '70';
      window.chooseImages.housingPreview.height = '70';
      window.chooseImages.housingPreviewBlock.appendChild(window.chooseImages.housingPreview);
    }

    var housing = window.chooseImages.housingChooser.files[0];
    var housingName = housing.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return housingName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.chooseImages.housingPreview.src = reader.result;
      });

      reader.readAsDataURL(housing);
    }
  });
})();
