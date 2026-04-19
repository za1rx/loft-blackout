class MiniSwiper {
  constructor(root, options = {}) {
    this.root = root;
    this.track = root.querySelector(".slider-track");

    this.options = {
      slidesToShow: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: false,
      autoplayDelay: 3000,
      breakpoints: {},
      ...options,
    };

    this.nextBtn = null;
    this.prevBtn = null;

    this.originalSlides = Array.from(this.track.children);
    this.slides = [];

    this.index = 0;
    this.startX = 0;
    this.isDragging = false;
    this.timer = null;

    this.init();
    this.attachEvents();
  }

  // ===== BREAKPOINTS =====
  getSlidesToShow() {
    let value = this.options.slidesToShow;

    Object.keys(this.options.breakpoints).forEach((bp) => {
      if (window.innerWidth >= bp) {
        value = this.options.breakpoints[bp].slidesToShow;
      }
    });

    return value;
  }

  // ===== INIT =====
  init() {
    this.track.innerHTML = "";

    this.slidesToShow = this.getSlidesToShow();

    if (this.options.loop) {
      const clonesBefore = this.originalSlides
        .slice(-this.slidesToShow)
        .map((el) => el.cloneNode(true));

      const clonesAfter = this.originalSlides
        .slice(0, this.slidesToShow)
        .map((el) => el.cloneNode(true));

      this.slides = [...clonesBefore, ...this.originalSlides, ...clonesAfter];
      this.index = this.slidesToShow;
    } else {
      this.slides = [...this.originalSlides];
      this.index = 0;
    }

    this.slides.forEach((slide) => this.track.appendChild(slide));

    this.setStyles();
    this.update(false);

    if (this.options.autoplay) {
      this.startAutoplay();
    }
    this.initNavigation();
  }

  setStyles() {
    const slideWidth = this.root.clientWidth / this.slidesToShow;

    this.track.style.gap = this.options.spaceBetween + "px";

    this.slides.forEach((slide) => {
      slide.style.minWidth = slideWidth + "px";
    });
  }

  update(animate = true) {
    this.track.style.transition = animate ? "transform 0.3s ease" : "none";

    const slideWidth = this.root.clientWidth / this.slidesToShow;
    const offset = this.index * (slideWidth + this.options.spaceBetween);

    this.track.style.transform = `translateX(-${offset}px)`;
  }

  initNavigation() {
    if (!this.options.navigation) return;

    this.nextBtn = this.root.querySelector(this.options.navigation.nextEl);
    this.prevBtn = this.root.querySelector(this.options.navigation.prevEl);

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.next());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prev());
    }
  }

  // ===== NAVIGATION =====
  next() {
    this.index++;
    this.update();
  }

  prev() {
    this.index--;
    this.update();
  }

  goTo(i) {
    this.index = i;
    this.update();
  }

  // ===== AUTOPLAY =====
  startAutoplay() {
    this.stopAutoplay();

    this.timer = setInterval(() => {
      this.next();
    }, this.options.autoplayDelay);
  }

  stopAutoplay() {
    if (this.timer) clearInterval(this.timer);
  }

  // ===== SWIPE =====
  handleSwipe(endX) {
    const diff = this.startX - endX;

    if (diff > 50) this.next();
    if (diff < -50) this.prev();
  }

  // ===== EVENTS =====
  attachEvents() {
    // swipe
    this.root.addEventListener("touchstart", (e) => {
      this.startX = e.touches[0].clientX;
    });

    this.root.addEventListener("touchend", (e) => {
      this.handleSwipe(e.changedTouches[0].clientX);
    });

    this.root.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.startX = e.clientX;
    });

    this.root.addEventListener("mouseup", (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.handleSwipe(e.clientX);
    });

    this.root.addEventListener("mouseleave", () => {
      this.isDragging = false;
    });

    // loop fix
    this.track.addEventListener("transitionend", () => {
      if (!this.options.loop) return;

      if (this.index >= this.originalSlides.length + this.slidesToShow) {
        this.index = this.slidesToShow;
        this.update(false);
      }

      if (this.index < this.slidesToShow) {
        this.index = this.originalSlides.length + this.slidesToShow - 1;
        this.update(false);
      }
    });

    // pause autoplay
    this.root.addEventListener("mouseenter", () => this.stopAutoplay());
    this.root.addEventListener("mouseleave", () => {
      if (this.options.autoplay) this.startAutoplay();
    });

    // resize
    window.addEventListener("resize", () => {
      this.init();
    });
  }

  // ===== DESTROY =====
  destroy() {
    this.stopAutoplay();
    this.track.innerHTML = "";
    this.originalSlides.forEach((slide) => this.track.appendChild(slide));
  }
}
