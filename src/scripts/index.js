import '../pages/index.css'
import { initialCards } from './cards.js';
import { createCard, deleteCard, toggleLike } from './card.js';
import { openModal, closeModal } from './modal.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleImageClick(cardData) {
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaptionElement.textContent = cardData.name;
  openModal(popupImage);
}

function renderCard(cardData) {
  const cardElement = createCard(cardData, deleteCard, toggleLike, handleImageClick);
  placesList.append(cardElement);
}

initialCards.forEach(renderCard);

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

profileAddButton.addEventListener('click', () => {
  openModal(popupNewCard);
});

document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
});

formNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameInput = formNewCard.querySelector('.popup__input_type_card-name');
  const linkInput = formNewCard.querySelector('.popup__input_type_url');
  
  const newCard = {
    name: nameInput.value,
    link: linkInput.value
  };
  
  renderCard(newCard);
  formNewCard.reset();
  closeModal(popupNewCard);
});

