'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector(window.ClassNames.AD_FORM_FIELD + ' input[type="file"]');
  var housingChooser = document.querySelector(window.ClassNames.AD_FORM_UPLOAD + ' input[type="file"]');
  var avatarPreviewBlock = document.querySelector(window.ClassNames.AD_FORM_AVATAR_PREVIEW);
  var housingPreviewBlock = document.querySelector(window.ClassNames.AD_FORM_PHOTO);
  var housingPreviewContainer = document.querySelector(window.ClassNames.AD_FORM_HOUSING_PREVIEW_CONTAINER);
  var avatarPreview;
  var housingPreview;
  var newHousingPreviewBlock;

  var cleanImgChooser = function () {
    cleanAvatarImg();

    var housingPreviewBlockList = housingPreviewContainer.querySelectorAll(window.ClassNames.AD_FORM_PHOTO_NEW);

    Array.from(housingPreviewBlockList).forEach(function (previewBlock) {
      housingPreviewContainer.removeChild(previewBlock);
    });

    if (housingPreviewBlock.querySelector('img')) {
      housingPreviewBlock.removeChild(housingPreviewBlock.lastChild);
    }
  };

  var cleanAvatarImg = function () {
    avatarPreview = avatarPreviewBlock.querySelector('img');

    if (avatarPreview.src !== 'img/muffin-grey.svg') {
      avatarPreviewBlock.removeChild(avatarPreview);
      var newAvatarPreview = document.createElement('img');
      newAvatarPreview.src = 'img/muffin-grey.svg';
      newAvatarPreview.alt = 'Аватар пользователя';
      newAvatarPreview.width = '40';
      newAvatarPreview.height = '44';
      avatarPreviewBlock.appendChild(newAvatarPreview);
    }
  };

  var loadImage = function (imageName, imagePreview, typeImage) {
    var matches = FILE_TYPES.some(function (type) {
      return imageName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
      });

      reader.readAsDataURL(typeImage);
    }
  };

  var createHousingImage = function (previewBlock) {
    housingPreview = document.createElement('img');
    housingPreview.width = '70';
    housingPreview.height = '70';
    previewBlock.appendChild(housingPreview);
  };

  var createHousingPreviewBlock = function () {
    newHousingPreviewBlock = document.createElement('div');
    newHousingPreviewBlock.classList.add(window.util.getClassWithoutPoint(window.ClassNames.AD_FORM_PHOTO_NEW));
    newHousingPreviewBlock.style.marginRight = '10px';
    newHousingPreviewBlock.style.marginBottom = '10px';
    housingPreviewContainer.appendChild(newHousingPreviewBlock);
  };

  avatarChooser.addEventListener('change', function () {
    avatarPreview = avatarPreviewBlock.querySelector('img');
    var avatar = avatarChooser.files[0];
    var avatarName = avatar.name.toLowerCase();

    loadImage(avatarName, avatarPreview, avatar);
  });

  housingChooser.addEventListener('change', function () {
    if (!housingPreviewBlock.querySelector('img')) {
      createHousingImage(housingPreviewBlock);
    } else {
      createHousingPreviewBlock();
      createHousingImage(newHousingPreviewBlock);
    }

    var housing = housingChooser.files[0];
    var housingName = housing.name.toLowerCase();

    loadImage(housingName, housingPreview, housing);
  });

  window.previewImages = {
    cleanImgChooser: cleanImgChooser
  };
})();
