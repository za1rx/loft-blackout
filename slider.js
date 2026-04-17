const reviews = new Swiper(".reviews", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  slidesPerView: 4,
  breakpoints: {
    320:{
        slidesPerView: 1,
    },
    
    480:{
        slidesPerView: 2,
    },

    860: {
        slidesPerView: 3,
    },

    1220: {
        slidesPerView: 4,
    },
  }
});

const corporateReviewsSwiper = new Swiper(".corporate-reviews-swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  navigation: {
    nextEl: '.corporate-reviews .button-next',
    prevEl: '.corporate-reviews .button-prev',
  },

  slidesPerView: 1,
  // breakpoints: {
  //   320:{
  //       slidesPerView: 1,
  //   },
    
  //   480:{
  //       slidesPerView: 2,
  //   },

  //   860: {
  //       slidesPerView: 3,
  //   },

  //   1220: {
  //       slidesPerView: 4,
  //   },
  // }
});

const reviewsAboutLoft = new Swiper(".reviews-about-loft-swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  navigation: {
    nextEl: '.reviews-about-loft .button-next',
    prevEl: '.reviews-about-loft .button-prev',
  },

  slidesPerView: 1,
  // breakpoints: {
  //   320:{
  //       slidesPerView: 1,
  //   },
    
  //   480:{
  //       slidesPerView: 2,
  //   },

  //   860: {
  //       slidesPerView: 3,
  //   },

  //   1220: {
  //       slidesPerView: 4,
  //   },
  // }
});

