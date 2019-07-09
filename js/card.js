// card.js
'use strict';
(function () {
  /**
   * Функция coздания объявления
   * @param {number} k - число
   * @return {object} advertObject - объект с данными объявления
   */
  var createAdvert = function (k) {
    var x = window.variables.getRandomIntegerFromInterval(0, window.variables.MAP_WIDTH);
    var y = window.variables.getRandomIntegerFromInterval(0, window.variables.MAP_HEIGTH);
    var advertObject = {
      author: {
        avatar: 'img/avatars/user0' + (k + 1) + '.png'
      },
      offer: {
        title: window.util.getRandomElementFromArray(window.variables.TITLES),
        address: x + ', ' + y,
        price: window.util.getRandomIntegerFromInterval(window.variables.PRICE_MIN, window.variables.PRICE_MAX),
        type: window.util.getRandomElementFromArray(window.variables.TYPES),
        rooms: window.util.getRandomFromInterval(window.variables.ROOMS_MIN, window.variables.ROOMS_MAX),
        guests: window.util.getRandomFromInterval(window.variables.GUESTS_MIN, window.variables.GUESTS_MAX),
        checkin: window.util.getRandomElementFromArray(window.variables.CHECKIN_TIME),
        checkout: window.util.getRandomElementFromArray(window.variables.CHECKOUT_TIME),
        features: window.util.getRandomSubarray(window.variables.FEATURES),
        description: '',
        photos: window.util.shuffleArray(window.variables.PHOTOS)
      },
      location: {
        x: x,
        y: y
      }
    };
    return advertObject;
  };

  /**
   * Функция создания массива из объектов объявлений
   */
  var adverts = [];
  for (var i = 0; i < window.util.COUNT; i++) {
    var advert = createAdvert(i);
    adverts.push(advert);
  }
  /**
   * Функция cоздания объявления
   * @param {object} advertOffer - данные о будущем объявлении
   * @return {object} advertTemplate - клонированные данные объявления
   */
  var renderAdvert = function (advertOffer) {
    var advertTemplate = window.variables.template.cloneNode(true);
    if (advertOffer.offer.title) {
      advertTemplate.querySelector('.popup__title').textContent = advertOffer.offer.title;
    } else {
      advertTemplate.querySelector('.popup__title').remove();
    }
    if (advertOffer.offer.address) {
      advertTemplate.querySelector('.popup__text--address').textContent = advertOffer.offer.address;
    } else {
      advertTemplate.querySelector('.popup__text--address').remove();
    }
    if (advertOffer.offer.price) {
      advertTemplate.querySelector('.popup__text--price').textContent = advertOffer.offer.price + '₽/ночь';
    } else {
      advertTemplate.querySelector('.popup__text--price').remove();
    }
    if (advertOffer.offer.rooms && advertOffer.offer.guests) {
      advertTemplate.querySelector('.popup__text--capacity').textContent = advertOffer.offer.rooms + ' комнаты для ' + advertOffer.offer.guests + ' гостей';
    } else {
      advertTemplate.querySelector('.popup__text--capacity').remove();
    }
    if (advertOffer.offer.time) {
      advertTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertOffer.offer.checkin + ' выезд до ' + advertOffer.offer.checkout;
    } else {
      advertTemplate.querySelector('.popup__text--time').remove();
    }
    if (advertOffer.offer.features) {
      advertTemplate.querySelector('.popup__features').innerHTML = '';
      var fragmentForFeatures = document.createDocumentFragment();
      for (var m = 0; m < advertOffer.offer.features.length; m++) {
        var photoFeature = document.createElement('li');
        photoFeature.classList.add('popup__feature');
        var className = 'popup__feature--' + advertOffer.offer.features[m];
        photoFeature.classList.add(className);
        fragmentForFeatures.appendChild(photoFeature);
        advertTemplate.querySelector('.popup__features').appendChild(fragmentForFeatures);
      }
    } else {
      advertTemplate.querySelector('.popup__features').remove();
    }
    advertTemplate.querySelector('.popup__description').textContent = advertOffer.offer.description;
    if (advertOffer.offer.photos) {
      advertTemplate.querySelector('.popup__photos').innerHTML = '';
      var fragmentForPhotos = document.createDocumentFragment();
      for (var j = 0; j < advertOffer.offer.photos.length; j++) {
        var photo = document.createElement('img');
        photo.classList.add('popup__photo');
        photo.src = advertOffer.offer.photos[j];
        photo.width = 45;
        photo.height = 40;
        photo.alt = 'Фотография жилья';
        fragmentForPhotos.appendChild(photo);
        advertTemplate.querySelector('.popup__photos').appendChild(fragmentForPhotos);
      }
    } else {
      advertTemplate.querySelector('.popup__photos').remove();
    }
    advertTemplate.classList.remove('.popup__avatar');
    advertTemplate.querySelector('.popup__avatar').src = advertOffer.author.avatar;
    advertTemplate.querySelector('.popup__type').textContent = window.variables.PlaceType[advertOffer.offer.type.toUpperCase()];
    advertTemplate.querySelector('.popup__close').addEventListener('click', closePopup);
    advertTemplate.querySelector('.popup__close').addEventListener('keydown', onPopupEnterPressClose);

    return advertTemplate;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.variables.ESC_KEYCODE) {
      closePopup();
    }
  };
  var onPopupEnterPressClose = function (evt) {
    if (evt.keyCode === window.variables.ENTER_KEYCODE) {
      closePopup();
    }
  };
  var closePopup = function () {
    if (window.variables.card) {
      window.variables.card.remove();
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };
  var showCardOnMap = function (advertOffer) {
    closePopup();
    var cardAdd = renderAdvert(advertOffer);
    window.variables.mapListCardElement.insertBefore(cardAdd, window.variables.filtersContainer);
    document.addEventListener('keydown', onPopupEscPress);
  };
  window.card = {
    showCardOnMap: showCardOnMap
  };
})();
