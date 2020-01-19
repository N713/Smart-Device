'use strict';

const body = document.querySelector(`body`);
const modal = document.querySelector(`.modal`);
const form = modal.querySelector(`.modal__form`);
const consultForm = body.querySelector(`.consult .form`);
const container = document.querySelector(`.container`);
const buttonOrderCall = body.querySelector(`.page-header__button`);
const modalCloseButton = modal.querySelector(`.modal__close`);

const nameInput = form.querySelector(`.modal__form-name input`);
const telInput = form.querySelector(`.modal__form-tel input`);
const textarea = form.querySelector(`textarea`);

const consultName = consultForm.querySelector(`.form__name input`);
const consultTel = consultForm.querySelector(`.form__tel input`);
const consultTextarea = consultForm.querySelector(`textarea`);

const getFreeConsultButton = container.querySelector(`.print-plates__button`);
const scrollDown = container.querySelector(`.print-plates__link`);
const consultSection = body.querySelector(`.consult__wrapper`);
const features = body.querySelector(`.features`);

const siteList = document.querySelector(`.site-parts-list`);
const partsListOpenIcon = siteList.querySelector(`.js-plus-parts`);
const partsListCloseIcon = siteList.querySelector(`.js-minus-parts`);
const sitePartsLists = siteList.querySelectorAll(`.js-parts-list`);
const officeListOpenIcon = siteList.querySelector(`.js-plus-office`);
const officeListCloseIcon = siteList.querySelector(`.js-minus-office`);
const officeList = siteList.querySelector(`.js-office-list`);

const ESC_KEYCODE = 27;
const TABLET_WIDTH = 767;

partsListCloseIcon.classList.remove(`visually-hidden`);
officeListCloseIcon.classList.remove(`visually-hidden`);

const closeModal = () => {
  modal.classList.add(`hide`);

  document.removeEventListener(`click`, closeModal);
  document.removeEventListener(`keydown`, closeModal);

  body.style.backgroundColor = `transparent`;
  container.style.opacity = `1`;
};

const openModal = () => {
  modal.classList.remove(`hide`);

  nameInput.focus();
  body.style.backgroundColor = `black`;
  container.style.opacity = `0.5`;
};

const scroll = (element) => {
  element.scrollIntoView({block: `start`, behavior: 'smooth'});
};

const showSitePartsLists = () => {
  sitePartsLists.forEach((list) => {
    list.classList.remove(`visually-hidden`);
  });
};

buttonOrderCall.addEventListener(`click`, (evt) => {
  evt.stopPropagation();

  if (modal.classList.contains(`hide`)) {
    openModal();
    modalCloseButton.addEventListener(`click`, closeModal);

    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === ESC_KEYCODE) {
        closeModal();
      }
    });

    container.addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      closeModal();
    });
  }
});

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  localStorage.setItem(`name`, nameInput.value);
  localStorage.setItem(`tel`, telInput.value);
  localStorage.setItem(`question`, textarea.value);
});

consultForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  localStorage.setItem(`name`, consultName.value);
  localStorage.setItem(`tel`, consultTel.value);
  localStorage.setItem(`question`, consultTextarea.value);
});

scrollDown.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  scroll(features);
});

getFreeConsultButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  scroll(consultSection);
});

partsListCloseIcon.addEventListener(`click`, () => {
  if(partsListOpenIcon.classList.contains(`visually-hidden`)) {
    partsListCloseIcon.classList.add(`visually-hidden`);
    partsListOpenIcon.classList.remove(`visually-hidden`);
    sitePartsLists.forEach((list) => {
      list.classList.add(`visually-hidden`);
    });

    partsListOpenIcon.addEventListener(`click`, () => {
      if(partsListCloseIcon.classList.contains(`visually-hidden`)) {
        partsListOpenIcon.classList.add(`visually-hidden`);
        partsListCloseIcon.classList.remove(`visually-hidden`);
        showSitePartsLists();
      }
    });
  }
});

officeListCloseIcon.addEventListener(`click`, () => {
  if(officeListOpenIcon.classList.contains(`visually-hidden`)) {
    officeListCloseIcon.classList.add(`visually-hidden`);
    officeListOpenIcon.classList.remove(`visually-hidden`);
    officeList.classList.add(`visually-hidden`);

    officeListOpenIcon.addEventListener(`click`, () => {
      if(officeListCloseIcon.classList.contains(`visually-hidden`)) {
        officeListOpenIcon.classList.add(`visually-hidden`);
        officeListCloseIcon.classList.remove(`visually-hidden`);
        officeList.classList.remove(`visually-hidden`);
      }
    });
  }
});

window.addEventListener(`resize`, (evt) => {
  if(window.innerWidth > TABLET_WIDTH && officeList.classList.contains(`visually-hidden`)) {
    officeList.classList.remove(`visually-hidden`);
    officeListOpenIcon.classList.add(`visually-hidden`);
    officeListCloseIcon.classList.remove(`visually-hidden`);
  }

  if(window.innerWidth > TABLET_WIDTH && sitePartsLists[0].classList.contains(`visually-hidden`)) {
    partsListOpenIcon.classList.add(`visually-hidden`);
    partsListCloseIcon.classList.remove(`visually-hidden`);
    showSitePartsLists();
  }
});

telInput.addEventListener(`focus`, () => {
  telInput.placeholder = `+7(`;
});

consultTel.addEventListener(`focus`, () => {
  consultTel.placeholder = `+7(`;
});
