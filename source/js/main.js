'use strict';

var body = document.querySelector(`body`);
var modal = document.querySelector(`.modal`);
var form = modal.querySelector(`.modal__form`);
var consultForm = body.querySelector(`.consult .form`);
var container = document.querySelector(`.container`);
var buttonOrderCall = body.querySelector(`.page-header__button`);
var modalCloseButton = modal.querySelector(`.modal__close`);

var textarea = form.querySelector(`textarea`);
var nameInput = form.querySelector(`#name-first`);

var consultName = consultForm.querySelector(`.form__name input`);
var consultTel = consultForm.querySelector(`.form__tel input`);
var consultTextarea = consultForm.querySelector(`textarea`);

var getFreeConsultButton = container.querySelector(`.print-plates__button`);
var scrollDown = container.querySelector(`.print-plates__link`);
var consultSection = body.querySelector(`.consult__wrapper`);
var features = body.querySelector(`.features`);

var siteList = document.querySelector(`.site-parts-list`);
var partsListOpenIcon = siteList.querySelector(`.js-plus-parts`);
var partsListCloseIcon = siteList.querySelector(`.js-minus-parts`);
var sitePartsLists = siteList.querySelectorAll(`.js-parts-list`);
var officeListOpenIcon = siteList.querySelector(`.js-plus-office`);
var officeListCloseIcon = siteList.querySelector(`.js-minus-office`);
var officeList = siteList.querySelector(`.js-office-list`);

var ESC_KEYCODE = 27;
var TABLET_WIDTH = 768;
var CATCH_TABLET = window.matchMedia("(min-width:" + TABLET_WIDTH + "px)");

partsListCloseIcon.classList.remove(`visually-hidden`);
officeListCloseIcon.classList.remove(`visually-hidden`);

var closeModal = function() {
  modal.classList.add(`hide`);
  body.classList.remove(`body--background-black`);
  body.classList.add(`body`);
  container.classList.remove(`container--half-opacity`);

  document.removeEventListener(`click`, closeModal);
  document.removeEventListener(`keydown`, closeModal);
};

var openModal = function() {
  modal.classList.remove(`hide`);
  body.classList.add(`body--background-black`);
  container.classList.add(`container--half-opacity`);

  nameInput.focus();
};

var scroll = function(element) {
  element.scrollIntoView({block: `start`, behavior: 'smooth'});
};

var showSitePartsLists = function () {
  sitePartsLists.forEach((list) => {
    list.classList.remove(`visually-hidden`);
  });
};

buttonOrderCall.addEventListener(`click`, function(evt){
  evt.stopPropagation();

  if (modal.classList.contains(`hide`)) {
    openModal();
    modalCloseButton.addEventListener(`click`, closeModal);

    document.addEventListener(`keydown`, function(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeModal();
      }
    });

    container.addEventListener(`click`, function(evt) {
      evt.stopPropagation();
      closeModal();
    });
  }
});

form.addEventListener(`submit`, function(evt) {
  evt.preventDefault();

  localStorage.setItem(`name`, nameInput.value);
  localStorage.setItem(`tel`, telInput.value);
  localStorage.setItem(`question`, textarea.value);
});

consultForm.addEventListener(`submit`, function(evt) {
  evt.preventDefault();

  localStorage.setItem(`name`, consultName.value);
  localStorage.setItem(`tel`, consultTel.value);
  localStorage.setItem(`question`, consultTextarea.value);
});

scrollDown.addEventListener(`click`, function(evt) {
  evt.preventDefault();
  scroll(features);
});

getFreeConsultButton.addEventListener(`click`, function(evt) {
  evt.preventDefault();
  scroll(consultSection);
});

partsListCloseIcon.addEventListener(`click`, function() {
  if(partsListOpenIcon.classList.contains(`visually-hidden`)) {
    partsListCloseIcon.classList.add(`visually-hidden`);
    partsListOpenIcon.classList.remove(`visually-hidden`);
    sitePartsLists.forEach((list) => {
      list.classList.add(`visually-hidden`);
    });

    partsListOpenIcon.addEventListener(`click`, function() {
      if(partsListCloseIcon.classList.contains(`visually-hidden`)) {
        partsListOpenIcon.classList.add(`visually-hidden`);
        partsListCloseIcon.classList.remove(`visually-hidden`);
        showSitePartsLists();
      }
    });
  }
});

officeListCloseIcon.addEventListener(`click`, function() {
  if(officeListOpenIcon.classList.contains(`visually-hidden`)) {
    officeListCloseIcon.classList.add(`visually-hidden`);
    officeListOpenIcon.classList.remove(`visually-hidden`);
    officeList.classList.add(`visually-hidden`);

    officeListOpenIcon.addEventListener(`click`, function() {
      if(officeListCloseIcon.classList.contains(`visually-hidden`)) {
        officeListOpenIcon.classList.add(`visually-hidden`);
        officeListCloseIcon.classList.remove(`visually-hidden`);
        officeList.classList.remove(`visually-hidden`);
      }
    });
  }
});

window.addEventListener(`resize`, function(evt) {
  if(CATCH_TABLET.matches && officeList.classList.contains(`visually-hidden`)) {
    officeList.classList.remove(`visually-hidden`);
    officeListOpenIcon.classList.add(`visually-hidden`);
    officeListCloseIcon.classList.remove(`visually-hidden`);
  }

  if(CATCH_TABLET.matches && sitePartsLists[0].classList.contains(`visually-hidden`)) {
    partsListOpenIcon.classList.add(`visually-hidden`);
    partsListCloseIcon.classList.remove(`visually-hidden`);
    showSitePartsLists();
  }
});
