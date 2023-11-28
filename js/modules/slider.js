function slider() {
  const slider = document.querySelector(".offer__slider"),
    sliderWrapper = slider.querySelector(".offer__slider-wrapper"),
    sliderInner = sliderWrapper.querySelector(".offer__slider-inner"),
    slides = sliderInner.querySelectorAll(".offer__slide"),
    slidesCount = slides.length,
    sliderCounter = slider.querySelector(".offer__slider-counter"),
    arrowPrev = sliderCounter.querySelector(".offer__slider-prev"),
    arrowNext = sliderCounter.querySelector(".offer__slider-next"),
    total = sliderCounter.querySelector("#total"),
    current = sliderCounter.querySelector("#current"),
    wrapperWidth = window.getComputedStyle(sliderWrapper).width,
    numWrapperWidth = +wrapperWidth.slice(0, wrapperWidth.length - 2),
    dotsArray = [];

  let slideIndex = 1,
    offset = 0;

  sliderInner.style.width = `${100 * slides.length}%`;

  slides.forEach((slide) => (slide.style.width = wrapperWidth));

  function drawNavigationDots() {
    slider.style.position = "relative";

    const dots = document.createElement("ol");

    dots.classList.add("carousel-dots");
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("li");
      dot.setAttribute("data-slide-to", i + 1);
      dot.classList.add("dot");
      dots.append(dot);
      dotsArray.push(dot);
    }

    dotsArray[slideIndex - 1].classList.add("dot-active");
  }

  function checkValueOfCurIndex(index) {
    index < 10
      ? (current.textContent = `0${index}`)
      : (current.textContent = index);
  }

  function checkvalueOfTotal(count) {
    count < 10
      ? (total.textContent = `0${slidesCount}`)
      : (total.textContent = slidesCount);
  }

  function slide(direction) {
    if (direction.toLowerCase() === "next") {
      dotsArray[slideIndex - 1].classList.remove("dot-active");

      +offset === numWrapperWidth * (slides.length - 1)
        ? (offset = 0)
        : (offset += numWrapperWidth);

      slideIndex == slides.length ? (slideIndex = 1) : slideIndex++;

      checkValueOfCurIndex(slideIndex);

      sliderInner.style.transform = `translateX(-${offset}px)`;

      dotsArray[slideIndex - 1].classList.add("dot-active");
    } else if (direction.toLowerCase() === "prev") {
      dotsArray[slideIndex - 1].classList.remove("dot-active");

      offset === 0
        ? (offset = numWrapperWidth * (slides.length - 1))
        : (offset -= numWrapperWidth);

      slideIndex == 1 ? (slideIndex = slides.length) : slideIndex--;

      checkValueOfCurIndex(slideIndex);

      sliderInner.style.transform = `translateX(-${offset}px)`;

      dotsArray[slideIndex - 1].classList.add("dot-active");
    } else {
      console.error("wrong function parameters");
    }
  }

  checkValueOfCurIndex(slideIndex);
  drawNavigationDots();
  checkvalueOfTotal(slidesCount);

  arrowNext.addEventListener("click", () => slide("next"));
  arrowPrev.addEventListener("click", () => slide("prev"));
  dotsArray.forEach((dot) =>
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      dotsArray[slideIndex - 1].classList.remove("dot-active");

      slideIndex = slideTo;
      offset = numWrapperWidth * (slideTo - 1);
      sliderInner.style.transform = `translateX(-${offset}px)`;

      dotsArray[slideIndex - 1].classList.add("dot-active");

      checkValueOfCurIndex(slideIndex);
    })
  );

  //  Почему я не получаю undefiend когда использую querySelector по отношению к элементам,
  //  которые появлятся в DOM только после вызова функции, которая вызывается после вызовов querySelector ?
}

module.exports = slider;
