import { getMenuData } from "../services/services";

function generateMenuCards() {
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
}

export default generateMenuCards;
