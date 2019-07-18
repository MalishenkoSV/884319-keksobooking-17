// card.js
'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var card = document.querySelector('.map__card.popup');
  var mapListCardElement = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var HousingType = {
    BUNGALO: 'Бунгало',
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
  };
  /**
   * Функция cоздания объявления
   * @param {object} advertOffer - данные о будущем объявлении
   * @return {object} advertTemplate - клонированные данные объявления
   */
  var renderAdvert = function (advertOffer) {
    var advertTemplate = template.cloneNode(true);
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
      advertOffer.offer.photos.forEach(function (j) {
        var photo = document.createElement('img');
        photo.classList.add('popup__photo');
        photo.src = advertOffer.offer.photos[j];
        photo.width = 45;
        photo.height = 40;
        photo.alt = 'Фотография жилья';
        fragmentForPhotos.appendChild(photo);
      });
      advertTemplate.querySelector('.popup__photos').appendChild(fragmentForPhotos);
    } else {
      advertTemplate.querySelector('.popup__photos').remove();
    }
    advertTemplate.classList.remove('.popup__avatar');
    advertTemplate.querySelector('.popup__avatar').src = advertOffer.author.avatar;
    advertTemplate.querySelector('.popup__type').textContent = HousingType[advertOffer.offer.type.toUpperCase()];
    advertTemplate.querySelector('.popup__close').addEventListener('click', closeCard);
    advertTemplate.querySelector('.popup__close').addEventListener('keydown', onPopupEnterPressClose);

    return advertTemplate;
  };

  var closeCardOnEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };
  var onPopupEnterPressClose = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeCard();
    }
  };
  var closeCard = function () {
    if (card) {
      card.remove();
    }
    document.removeEventListener('keydown', closeCardOnEscPress);
  };
  /**
   * Функция определения координаты адресса пина
   * @param {object} advertOffer - объект объявления
   */
  var showCardOnMap = function (advertOffer) {
    closeCard();
    var cardAdd = renderAdvert(advertOffer);
    mapListCardElement.insertBefore(cardAdd, filtersContainer);
    document.addEventListener('keydown', closeCardOnEscPress);
  };
  window.card = {
    showCardOnMap: showCardOnMap
  };
})();
