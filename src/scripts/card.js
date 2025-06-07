export const createCard = ({ 
  cardName, 
  cardLink, 
  cardLikes, 
  cardId, 
  userId, 
  ownerId, 
  removeCard, 
  deleteHandler, 
  showLike, 
  putLike, 
  removeLike, 
  openImagePopup, 
  cardTemplate 
}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-button-count');

  cardTitle.textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  likeCount.textContent = cardLikes.length;

  likeButton.addEventListener('click', () => {
    showLike(cardId, likeButton, putLike, removeLike, likeCount);
  });

  if (userId === ownerId) {
    deleteButton.addEventListener('click', () => {
      removeCard(cardElement, deleteHandler, cardId);
    });
  } else {
    deleteButton.style.display = 'none';
  }

  if (cardLikes.some((user) => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => {
    openImagePopup(cardLink, cardName);
  });

  return cardElement;
};

export const removeCard = (cardElement, deleteHandler, cardId) => {
  deleteHandler(cardElement, cardId);
};

export const showLike = (cardId, likeButton, putLike, removeLike, likeCount) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeAction = isLiked ? removeLike(cardId) : putLike(cardId);
  
  likeAction
    .then((cardInfo) => {
      likeCount.textContent = cardInfo.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(console.error);
};