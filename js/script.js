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
  const endOfSale = "2023-03-20";

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
});

// __ Modal ___
const contactBtns = document.querySelectorAll("[data-modal]"),
  modal = document.querySelector(".modal"),
  closeModalBtn = document.querySelector("[data-modalClose]");

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
  if (event.target === modal) {
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
closeModalBtn.addEventListener("click", closeModal);

const modalTimerID = setTimeout(showModal, 7500);

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
const DATA_MENUCARDS = {
  fitnes: {
    title: "Фитнес",
    textContent: `Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    imgSrc: "img/tabs/vegy.jpg",
    imgAlt: "vegy food",
    price: 229,
  },
  premium: {
    title: "Премиум",
    textContent: `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    imgSrc: "img/tabs/elite.jpg",
    imgAlt: "premium food",
    price: 550,
  },
  post: {
    title: "Постное",
    textContent: `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
    imgSrc: "img/tabs/post.jpg",
    imgAlt: "post food",
    price: 430,
  },
};

class MenuItem {
  constructor(imgSrc, imgAlt, title, text, price, parentSelector) {
    this.imgSrc = imgSrc;
    this.imgAlt = imgAlt;
    this.title = title;
    this.text = text;
    this.price = price;
    this.transfer = 27;
    this.parent = document.querySelector(parentSelector);
    this.changeToUSD();
  }
  renderMenuCard() {
    const element = document.createElement("div");
    element.innerHTML = `<div class="menu__item">
              <img src=${this.imgSrc} alt=${this.imgAlt}>
              <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
              <div class="menu__item-descr">${this.text}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> $/день</div>
              </div>
            </div>`;
    this.parent.append(element);
  }
  changeToUSD() {
    this.price = Math.round(this.price / this.transfer);
  }
}

for (let key in DATA_MENUCARDS){
  new MenuItem(
    DATA_MENUCARDS[key].imgSrc,
    DATA_MENUCARDS[key].imgAlt,
    DATA_MENUCARDS[key].title,
    DATA_MENUCARDS[key].textContent,
    DATA_MENUCARDS[key].price,
    ".menu .container"
  ).renderMenuCard();
}
