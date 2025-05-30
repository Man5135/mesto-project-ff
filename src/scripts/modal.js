export function openModal(modalElement) {
  modalElement.classList.add('popup_is-animated');
  setTimeout(() => {
    modalElement.classList.add('popup_is-opened');
  }, 0);
  document.addEventListener('keydown', handleEscape);
  modalElement.addEventListener('click', handleOverlayClick);
}

export function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
  modalElement.removeEventListener('click', handleOverlayClick);
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}