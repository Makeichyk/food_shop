"use strict";
import calorieСalc from "./modules/calorieСalc";
import menuCards from "./modules/menuCards";
import forms from "./modules/implementForms";
import modalWindow from "./modules/modalWindow";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import saleTimer from "./modules/saleTimer";
import { showModal } from "./modules/modalWindow";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerID = setTimeout(
    () => showModal(".modal", modalTimerID),
    50000
  );

  calorieСalc();
  menuCards();
  forms(modalTimerID, "form");

  modalWindow("[data-modal]", ".modal", modalTimerID);

  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCur: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
    sliderCounterSelector: ".offer__slider-counter",
  });

  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );

  saleTimer(".timer", "2023-12-30");
});
