const slider1 = new MiniSwiper(document.getElementById("slider1"), {
  loop: true,
  autoplay: true,
  autoplayDelay: 2000,
  spaceBetween: 10,

  breakpoints: {
    600: { slidesToShow: 2 },
    900: { slidesToShow: 3 },
    1200: { slidesToShow: 4 },
  },

  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
});

const slider2 = new MiniSwiper(document.getElementById("slider2"), {
  loop: true,
  autoplay: false,
  autoplayDelay: 2000,
  spaceBetween: 10,
  slidesToShow: 1,
});

const slider3 = new MiniSwiper(document.getElementById("slider3"), {
  loop: true,
  autoplay: true,
  autoplayDelay: 1500,
  spaceBetween: 10,
  slidesToShow: 1,
});
