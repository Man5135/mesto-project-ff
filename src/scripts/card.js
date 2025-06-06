const cardTemplate = document.querySelector('#card-template').content;
export function createCard(cardData, deleteCallback, likeCallback, imageClickCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => deleteCallback(cardElement));
  likeButton.addEventListener('click', likeCallback);
  cardImage.addEventListener('click', () => imageClickCallback(cardData));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}