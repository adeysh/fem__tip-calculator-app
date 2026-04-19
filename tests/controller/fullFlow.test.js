import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { initApp } from "../../src/js/controller.js";

describe("Tip Calculator - Full Flow", () => {
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
    };

    initApp(elements);
  });

  it("allows user to calculate tip from start to finish", async () => {
    const billInput = document.querySelector('[name="bill"]');
    const peopleInput = document.querySelector('[name="people"]');

    // Step 1: user enters bill
    await userEvent.type(billInput, "100");

    // Step 2: user enters number of people
    await userEvent.type(peopleInput, "2");

    // Step 3: tip already selected (10%)
    // → form auto-submits via your logic

    // Step 4: verify UI updates correctly
    expect(document.getElementById("tip-amount").textContent).toBe("5.00");
    expect(document.getElementById("total").textContent).toBe("55.00");

    // Step 5: verify popup values too
    expect(document.getElementById("total-tip-popup").textContent).toBe(
      "10.00",
    );
    expect(document.getElementById("total-amount-popup").textContent).toBe(
      "110.00",
    );
  });
});
