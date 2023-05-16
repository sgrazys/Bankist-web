'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header')
const body = document.querySelector('body')

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

// IMPLEMENTING STICKY NAVIGATION (!!!NOT USE IT - LOW PERFROMANCE!!!)
// Start:
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(this.window.scrollY);

//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }


// })

// Eend.

// IMPLEMENTING STICKY NAVIGATION: Interaction Obsever API 
// Start:

// const options = {
//   root: null, // viewportas, matoma browserio lango dalis // gali buti ir kiti elementai pasirinkti. T.y. stebijimo elelemtas ka stebime.
//   threshold: [0, 0.2] // kiek % turi persidengti mmusu target'as su stebejimo dalimi, siuo atveju viewporto. Kai bus pasiektas norimas procentas, pasileis callback funkcija
// }

// const obsCallback = function (entries, observer) {

// }

// const observer = new IntersectionObserver(obsCallback, options);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries;
  entry.isIntersecting ? nav.classList.remove('sticky') : nav.classList.add('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})


headerObserver.observe(header)
// End.


// IMPLEMENTING REVEALSECTION ON SCROLL
// Start:


const allSections = document.querySelectorAll('.section');


const revealSection = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)

}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


// End

///////////////////////////////////////
// LEARNING STUFF
// Start:

// const header = document.querySelector('.header'); // pasirenkame pagal class
// const allSections = document.querySelectorAll('.section'); // pasirenkam visus elementus su class section, grazina node list'a

// document.getElementById('section--1'); // pasirenkame eleenta pgl ID


// // //  Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookies for improved funcionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.append(message);
// // header.append(message.cloneNode(true))

// // //  Deleting elements
// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   message.remove();
// });


// // Some style on 'cookies message'
// message.style.width = '104%';
// message.style.padding = '8px';
// message.style.backgroundColor = '#37383d'

//END
///////////////////////////////////////