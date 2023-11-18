"use strict";

window.addEventListener("DOMContentLoaded", () => {
  // ___ TABS ___
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsParent = document.querySelector(".tabheader__items"),
    tabsContent = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();

  //  ___ Timer _____
  const endOfSale = "2023-12-20";

  function getTimeRemaining(deadline) {
    let days, hours, minutes, seconds;
    const t = Date.parse(deadline) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / 1000 / 60 / 60 / 24);
      hours = Math.floor((t / 1000 / 60 / 60) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = t.days < 10 ? `0${t.days}` : t.days;
      hours.innerHTML = t.hours < 10 ? `0${t.hours}` : t.hours;
      minutes.innerHTML = t.minutes < 10 ? `0${t.minutes}` : t.minutes;
      seconds.innerHTML = t.seconds < 10 ? `0${t.seconds}` : t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", endOfSale);

  // __ Modal ___
  const contactBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function showModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerID);
  }
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  // close modal on click on background
  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.getAttribute("data-modalClose") == ""
    ) {
      closeModal();
    }
  });
  // close modal on press "Escape"
  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  contactBtns.forEach((btn) => btn.addEventListener("click", showModal));

  const modalTimerID = setTimeout(showModal, 50000);

  function showModalByScroll() {
    {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        showModal();
        window.removeEventListener("scroll", showModalByScroll);
      }
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // ___ CLASSES ____

  class MenuItem {
    constructor(
      imgSrc,
      imgAlt,
      title,
      text,
      price,
      parentSelector,
      ...classes
    ) {
      this.imgSrc = imgSrc;
      this.imgAlt = imgAlt;
      this.title = title;
      this.text = text;
      this.price = price;
      this.transfer = 27;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
    }

    renderMenuCard() {
      const element = document.createElement("div");
      if (this.classes.length == 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        !this.classes.includes("menu__item")
          ? element.classList.add("menu__item")
          : true;
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
              <img src=${this.imgSrc} alt=${this.imgAlt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.text}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> $/день</div>
              </div>`;
      this.parent.append(element);
    }
  }

  const getMenuData = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getMenuData("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuItem(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container",
        "menu__item"
      ).renderMenuCard();
    });
  });

  // FORMS

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "./img/form/spinner.svg",
    success: "Thanks! We will connect with you",
    failure: "something went wrong",
  };

  forms.forEach((form) => bindPostData(form));

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;

      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThankModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThankModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThankModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    showModal();

    const thankModal = document.createElement("div");
    thankModal.classList.add("modal__dialog");
    thankModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-modalClose>×</div>
      <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector(".modal").append(thankModal);

    setTimeout(() => {
      thankModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));

  // SLIDER

  const sliderWrapper = document.querySelector(".offer__slider-wrapper"),
    sliderInner = sliderWrapper.querySelector(".offer__slider-inner"),
    slides = sliderInner.querySelectorAll(".offer__slide"),
    slidesCount = slides.length,
    sliderCouner = document.querySelector(".offer__slider-counter"),
    arrowPrev = sliderCouner.querySelector(".offer__slider-prev"),
    arrowNext = sliderCouner.querySelector(".offer__slider-next"),
    total = sliderCouner.querySelector("#total"),
    current = sliderCouner.querySelector("#current"),
    wrapperWidth = window.getComputedStyle(sliderWrapper).width,
    numWrapperWidth = +wrapperWidth.slice(0, wrapperWidth.length - 2);

  let slideIndex = 1,
    offset = 0;

  sliderInner.style.width = `${100 * slides.length}%`;
  slides.forEach((slide) => (slide.style.width = wrapperWidth));

  current.textContent = `0${slideIndex}`;
  if (slidesCount < 10) {
    total.textContent = `0${slidesCount}`;
  } else {
    total.textContent = slidesCount;
  }

  function slide(direction) {
    if (direction.toLowerCase() === "next") {
      +offset === numWrapperWidth * (slides.length - 1)
        ? (offset = 0)
        : (offset += numWrapperWidth);

      slideIndex == slides.length ? (slideIndex = 1) : slideIndex++;

      slideIndex < 10
        ? (current.textContent = `0${slideIndex}`)
        : (current.textContent = slideIndex);

      sliderInner.style.transform = `translateX(-${offset}px)`;
    } else if (direction.toLowerCase() === "prev") {
      offset === 0
        ? (offset = numWrapperWidth * (slides.length - 1))
        : (offset -= numWrapperWidth);

      slideIndex == 1 ? (slideIndex = slides.length) : slideIndex--;

      slideIndex < 10
        ? (current.textContent = `0${slideIndex}`)
        : (current.textContent = slideIndex);

      sliderInner.style.transform = `translateX(-${offset}px)`;
    } else {
      console.error("wrong function parameters");
    }
  }

  arrowNext.addEventListener("click", () => slide("next"));
  arrowPrev.addEventListener("click", () => slide("prev"));
});
