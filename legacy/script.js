(() => {
  const deck = document.querySelector(".slides");
  const slides = [...document.querySelectorAll(".slide")];
  const dots = [...document.querySelectorAll(".dot")];
  const prevButton = document.querySelector(".nav-prev");
  const nextButton = document.querySelector(".nav-next");
  const currentLabel = document.querySelector("#currentSlide");
  const goButtons = [...document.querySelectorAll("[data-go]")];
  const nextButtons = [...document.querySelectorAll("[data-next]")];

  let activeIndex = 0;
  let locked = false;
  let touchStartX = 0;
  let touchStartY = 0;

  const hashMatch = window.location.hash.match(/slide-(\d)/);
  if (hashMatch) {
    activeIndex = Math.min(slides.length - 1, Math.max(0, Number(hashMatch[1]) - 1));
  }

  function showSlide(index, updateHash = true) {
    const nextIndex = Math.min(slides.length - 1, Math.max(0, index));
    if (nextIndex === activeIndex && deck.dataset.ready) return;

    activeIndex = nextIndex;
    deck.style.transform = `translate3d(-${activeIndex * (100 / slides.length)}%, 0, 0)`;
    document.body.dataset.slide = String(activeIndex);
    currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.toggleAttribute("inert", !isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
      dot.tabIndex = isActive ? 0 : -1;
    });

    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;

    if (updateHash) {
      history.replaceState(null, "", `#slide-${activeIndex + 1}`);
    }

    locked = true;
    window.setTimeout(() => { locked = false; }, 900);
    deck.dataset.ready = "true";
  }

  function move(direction) {
    if (locked) return;
    showSlide(activeIndex + direction);
  }

  prevButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));
  nextButtons.forEach((button) => button.addEventListener("click", () => showSlide(activeIndex + 1)));
  goButtons.forEach((button) => button.addEventListener("click", (event) => {
    event.preventDefault();
    showSlide(Number(button.dataset.go));
  }));

  document.addEventListener("keydown", (event) => {
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      move(1);
    }
    if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "Home") showSlide(0);
    if (event.key === "End") showSlide(slides.length - 1);
  });

  document.addEventListener("wheel", (event) => {
    const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(dominantDelta) < 18 || locked) return;
    event.preventDefault();
    move(dominantDelta > 0 ? 1 : -1);
  }, { passive: false });

  document.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    const deltaX = touchStartX - event.changedTouches[0].clientX;
    const deltaY = touchStartY - event.changedTouches[0].clientY;
    const dominantDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
    if (Math.abs(dominantDelta) > 45) move(dominantDelta > 0 ? 1 : -1);
  }, { passive: true });

  window.addEventListener("hashchange", () => {
    const match = window.location.hash.match(/slide-(\d)/);
    if (match) showSlide(Number(match[1]) - 1, false);
  });

  showSlide(activeIndex, false);
})();
