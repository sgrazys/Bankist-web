'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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


// IMPLEMENTING SMOOTH SCROLLING
// Start:

btnScrollTo.addEventListener('click', () => section1.scrollIntoView({ behavior: 'smooth' }))

// End:


//IMPLEMENTING PAGE NAVIGATION (smooth scrolling behaviour.)
// Start: 
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching Startegy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

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


// End


// IMPLEMENTING TABBED COMPONENT
// Start:

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  //Matching startegy
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

// End

// IMPLEMENTING MENU FADE ANIMATION
// Start:

const handleHover = function (e) {

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this
    });
    logo.style.opacity = this

  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// End:

///////////////////////////////////////
// LEARNING STUFF
// Start:

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