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


// IMPLEMENTING REVEAL SECTION ON SCROLL
// Start:


const allSections = document.querySelectorAll('.section');


const revealSection = function (entries, observer) {
  const [entry] = entries
  // console.log('This is observer', observer);
  // console.log('This is entries', entries);
  // console.log('This is entry', entry);
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
  // section.classList.add('section--hidden');
});

// End


// IMPLEMENTING LAZY LOADING IMAGES
// Start:

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return
  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)

}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => {
  imgObserver.observe(img);
})

// End.


// IMPLEMENTING SLIDER COMPONENT
// Start:

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0
  const maxSlide = slides.length;

  const slider = document.querySelector('.slider');

  // Functions
  const createDots = function (num) {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })

  }


  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(d => {
      d.classList.remove('dots__dot--active')
    })

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }


  const goToSlide = function (slide) {
    return slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
  }



  // Next slide
  const nextSlide = function () {
    if (maxSlide - 1 === curSlide) {
      curSlide = 0

    } else curSlide++

    goToSlide(curSlide);
    activateDot(curSlide);
  }

  // Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1
    } else curSlide--

    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);

  }

  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();

  })

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log(e);
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }

  })
}

slider();

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


// LIFECYCLE DOM EVENTS

//DOMContentLoaded - ivykis pasileidzia kaip uzkraunamas HTML'as is sukuriamas DOM'as. Kiti veiksniai neprivalo buti uzbaigti pvz: paveiklseliu atsiuntimas, ar JS uzkrovimas

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML Parsed and DOM tree built', e);
// })

// // load - ivykis pasileidzia kai visi failai uzsikrauna (HTML, CSS, JS, images etc) VISKAS TURI UZSIKRAUTI. Isauna tik tada kai HTML dokas yra pilnai pasrsiunciamas ir sukuriamas DOM'as. ISAUNA ant windows

// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e);
// })

// beforeunload - isauna pries paliekant puslapi. Gali rodyt upranesimus ar prasyti patvirtinimo is userio jeigu puslapyje yra nepabaigtu veiksmu. ISAUNA ant winoes

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })


//END
///////////////////////////////////////