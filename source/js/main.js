'use strict';

const body = document.querySelector(`body`);
const modal = document.querySelector(`.modal`);
const container = document.querySelector(`.container`);
const buttonOrderCall = body.querySelector(`.page-header__button`);
const modalCloseButton = modal.querySelector(`.modal__close`);
const ESC_KEYCODE = 27;

const closeModal = () => {
  modal.classList.add(`hide`);

  document.removeEventListener(`click`, closeModal);
  document.removeEventListener(`keydown`, closeModal);

  body.style.backgroundColor = `transparent`;
  container.style.opacity = `1`;
};

const openModal = () => {
  modal.classList.remove(`hide`);

  body.style.backgroundColor = `black`;
  container.style.opacity = `0.5`;
};

buttonOrderCall.addEventListener(`click`, (evt) => {
  evt.stopPropagation();

  if (modal.classList.contains(`hide`)) {
    openModal();

    modalCloseButton.addEventListener(`click`, closeModal);
    document.addEventListener(`click`, closeModal);
    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === ESC_KEYCODE) {
        closeModal();
      }
    });
  }
});
