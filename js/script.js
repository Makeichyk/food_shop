"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const calorieСalc = require('./modules/calorieСalc');
  const menuCards = require("./modules/menuCards");
  const forms = require("./modules/implementForms");
  const modalWindow = require("./modules/modalWindow");
  const slider = require("./modules/slider");
  const tabs = require("./modules/tabs");
  const saleTimer = require("./modules/saleTimer");


  calorieСalc();
  menuCards();
  forms();
  modalWindow();
  slider();
  tabs();
  saleTimer();
});
