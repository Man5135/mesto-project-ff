import '../pages/index.css'
import { initialCards } from './cards.js';
import { createCard, deleteCard, toggleLike } from './card.js';
import { openModal, closeModal } from './modal.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImagePreview = document.querySelector('.popup_type_image');
const imagePreviewElement = popupImagePreview.querySelector('.popup__image');
const imagePreviewCaptionElement = popupImagePreview.querySelector('.popup__caption');
const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];

const inputNameEditProfileForm = formEditProfile.querySelector('.popup__input_type_name');
const inputJobEditProfileForm = formEditProfile.querySelector('.popup__input_type_description');
const inputCardNameAddCardForm = formAddCard.querySelector('.popup__input_type_card-name');
const inputCardLinkAddCardForm = formAddCard.querySelector('.popup__input_type_url');

const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

function handleImageClick(cardData) {
  imagePreviewElement.src = cardData.link;
  imagePreviewElement.alt = cardData.name;
  imagePreviewCaptionElement.textContent = cardData.name;
  openModal(popupImagePreview);
}

function renderCard(cardData) {
  const cardElement = createCard(cardData, deleteCard, toggleLike, handleImageClick);
  placesList.prepend(cardElement);
}

initialCards.reverse().forEach(renderCard);

profileEditButton.addEventListener('click', () => {
  inputNameEditProfileForm.value = profileTitleElement.textContent;
  inputJobEditProfileForm.value = profileDescriptionElement.textContent;
  openModal(popupEditProfile);
});

profileAddButton.addEventListener('click', () => openModal(popupAddCard));

document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', () => {
    closeModal(button.closest('.popup'));
  });
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(popup);
    }
  });
});

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitleElement.textContent = inputNameEditProfileForm.value;
  profileDescriptionElement.textContent = inputJobEditProfileForm.value;
  closeModal(popupEditProfile);
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {
    name: inputCardNameAddCardForm.value,
    link: inputCardLinkAddCardForm.value
  };
  renderCard(newCard);
  formAddCard.reset();
  closeModal(popupAddCard);
});