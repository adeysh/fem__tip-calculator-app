import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { initApp } from "../../src/js/controller.js";

describe("App Integration", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="calculator-form">
        <input name="bill" />
        <input name="people" />
        <input type="radio" name="options" value="10" checked />
        <input name="custom-tip" />
      </form>

      <span id="tip-amount"></span>
      <span id="total"></span>
      <span id="total-tip-popup"></span>
      <span id="total-amount-popup"></span>

      <button id="reset-btn"></button>
      <p id="message"></p>
      <div id="popup"></div>
      <button id="question-popup"></button>
    `;

    const elements = {
      form: document.getElementById("calculator-form"),
      tipAmount: document.getElementById("tip-amount"),
      total: document.getElementById("total"),
      totalTipPopup: document.getElementById("total-tip-popup"),
      totalAmountPopup: document.getElementById("total-amount-popup"),
      resetBtn: document.getElementById("reset-btn"),
      customTip: document.querySelector('[name="custom-tip"]'),
      tipButtons: document.querySelectorAll('[name="options"]'),
      message: document.getElementById("message"),
      popup: document.getElementById("popup"),
      questionBtn: document.getElementById("question-popup"),

      bill: document.querySelector('[name="bill"]'),
      people: document.querySelector('[name="people"]'),
    };

    initApp(elements);
  });

  it("calculates tip through user interaction", async () => {
    const bill = document.querySelector('[name="bill"]');
    const people = document.querySelector('[name="people"]');

    await userEvent.type(bill, "100");
    await userEvent.type(people, "2");

    expect(document.getElementById("tip-amount").textContent).toBe("5.00");
  });

  it("resets UI when reset button clicked", async () => {
    const resetBtn = document.getElementById("reset-btn");

    await userEvent.click(resetBtn);

    expect(document.getElementById("tip-amount").textContent).toBe("0.00");
  });

  it("shows error for invalid input", async () => {
    const bill = document.querySelector('[name="bill"]');
    const people = document.querySelector('[name="people"]');

    await userEvent.type(bill, "0");
    await userEvent.type(people, "2");

    const form = document.getElementById("calculator-form");
    form.requestSubmit();

    expect(bill.classList.contains("calculator__input--error")).toBe(true);
  });

  it("toggles popup on button click", async () => {
    const btn = document.getElementById("question-popup");
    const popup = document.getElementById("popup");

    await userEvent.click(btn);

    expect(popup.classList.contains("show")).toBe(true);
  });
});
