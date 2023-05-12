'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////
// Modal window

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

///////////////////////////////////////
// IMPLEMENTING SMOOTH SCROLLING
// START:

btnScrollTo.addEventListener('click', () => section1.scrollIntoView({ behavior: 'smooth' }))

// END:

///////////////////////////////////////
//IMPLEMENTING PAGE NAVIGATION (smooth scrolling behaviour.)
// START: 

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = el.getAttribute('href');
//     //#section--1

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

//   })
// })

// EVENT DELEGATION
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching startegy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})
// END]


///////////////////////////////////////
// LEARNING STUFF
// START:

const header = document.querySelector('.header'); // pasirenkame pagal class
const allSections = document.querySelectorAll('.section'); // pasirenkam visus elementus su class section, grazina node list'a

document.getElementById('section--1'); // pasirenkame eleenta pgl ID


// //  Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improved funcionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);
// header.append(message.cloneNode(true))

// //  Deleting elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
});


// Some style on 'cookies message'
message.style.width = '104%';
message.style.padding = '8px';
message.style.backgroundColor = '#37383d'

//END
///////////////////////////////////////