import { initApp } from "./controller.js";

function getElements() {
  return {
    form: document.getElementById("calculator-form"),
    tipAmount: document.getElementById("tip-amount"),
    total: document.getElementById("total"),
    totalTipPopup: document.getElementById("total-tip-popup"),
    totalAmountPopup: document.getElementById("total-amount-popup"),
    resetBtn: document.getElementById("reset-btn"),

    customTip: document.getElementById("custom-tip"),
    tipButtons: document.querySelectorAll(".calculator__tip-option"),
    message: document.getElementById("message"),
    popup: document.getElementById("popup"),
    questionBtn: document.getElementById("question-popup"),
  };
}

const elements = getElements();

if (elements.form) {
  initApp(elements);
}
