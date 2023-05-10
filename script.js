'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal)
})


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//// Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);


const header = document.querySelector('.header'); // pasirenkame pagal class
const allSections = document.querySelectorAll('.section'); // pasirenkam visus elementus su class section, grazina node list'a
// console.log(allSections);

document.getElementById('section--1'); // pasirenkame eleenta pgl ID

const allButtons = document.getElementsByTagName('button'); // pasirenkame visus elementus pagal tag'a
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));


// // //  creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved funcionality and analytics.';
message.innerHTML = 'We use cookies for improved funcionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true))

// header.before(message);
// header.after(message);

// // //  Deleting elements

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();

  // message.parentElement.removeChild(message);
})
