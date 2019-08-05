// card.js
'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var housingType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var button = document.querySelector('.popup__close');
  var filtersContainer = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  /**
   * отрисовывает фото жилья
   * @param {HTMLElement} element
   * @param {array} photosList
   */
  var renderPhotos = function (element, photosList) {
    var photo = element.querySelector('.popup__photo');
    var template = photo.cloneNode();
    element.removeChild(photo);
    for (var i = 0; i < photosList.length; i++) {
      var clone = template.cloneNode(true);
      clone.src = photosList[i];
      element.appendChild(clone);
    }
  };
  /**
   * отрисовывает удобства
   * @param {HTMLElement} template
   * @param {array} features
   */
  var renderFeatures = function (template, features) {
    template.querySelector('.popup__features');
    var fragmentForFeatures = document.createDocumentFragment();
    for (var j = 0; j < features.length; j++) {
      var photoFeature = document.createElement('li');
      photoFeature.classList.add('popup__feature');
      var className = 'popup__feature--' + features[j];
      photoFeature.classList.add(className);
      fragmentForFeatures.appendChild(photoFeature);
    }
  };
  /**
  * отрисовывает карточку объявления по шаблону
  * @param {object} advertOffer
  * @return {object} advertTemplate
  */
  var renderAdvert = function (advertOffer) {
    var advertTemplate = cardTemplate.cloneNode(true);
    advertTemplate.querySelector('.popup__title').textContent = advertOffer.offer.title;
    advertTemplate.querySelector('.popup__title').textContent = advertOffer.offer.title;
    advertTemplate.querySelector('.popup__text--address').textContent = advertOffer.offer.address;
    advertTemplate.querySelector('.popup__text--price').textContent = advertOffer.offer.price + '₽/ночь';
    advertTemplate.querySelector('.popup__text--capacity').textContent = advertOffer.offer.rooms + ' комнаты для ' + advertOffer.offer.guests + ' гостей';
    advertTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertOffer.offer.checkin + ' выезд до ' + advertOffer.offer.checkout;
    advertTemplate.querySelector('.popup__description').textContent = advertOffer.offer.description;
    advertTemplate.querySelector('.popup__avatar').src = advertOffer.author.avatar;
    advertTemplate.querySelector('.popup__type').textContent = housingType[advertOffer.offer.type];
    var templatePhotos = advertTemplate.querySelector('.popup__photos');
    var templateFeatures = advertTemplate.querySelector('.popup__features');
    renderFeatures(templateFeatures, advertOffer.offer.features);
    renderPhotos(templatePhotos, advertOffer.offer.photos);
    advertTemplate.querySelector('.popup__close').addEventListener('click', onCardCloseOnClick);
    advertTemplate.querySelector('.popup__close').addEventListener('keydown', onEnterKeyDown);
    return advertTemplate;
  };
  /**
   * Функция показа  пинов  на карте
   * @param {object} adOffer - объект объявления
   */
  var onMapShowCard = function (adOffer) {
    onCardClose();
    document.addEventListener('keydown', onEscKeyDown);
    if (!adOffer.offer) {
      return;
    }
    var cardElement = renderAdvert(adOffer);
    window.form.map.insertBefore(cardElement, filtersContainer);
  };
  /**
   * Функция удаления карточки  на карте
   */
  var onCardClose = function () {
    var cardAd = document.querySelector('.map__card.popup');
    if (cardAd) {
      cardAd.remove();
    }
  };
  var onCardCloseOnClick = function () {
    onCardClose();
    button.removeEventListener('click', onCardCloseOnClick);
  };

  /**
   *  Функция закрытия окна ошибки при нажатии на ESC
   * @param {object} evt - DOM event object
   */
  var onEscKeyDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onCardClose();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  /**
   *  Функция закрытия окна ошибки при нажатии на Enter
   * @param {object} evt - DOM event object
   */
  var onEnterKeyDown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onCardClose();
    }
    button.removeEventListener('keydown', onEnterKeyDown);
  };
  window.card = {
    close: onCardClose,
    onMapShowAdd: onMapShowCard,
    onEnterKeyDown: onEnterKeyDown
  };
})();
