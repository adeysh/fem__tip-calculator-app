import { describe, it, expect } from "vitest";
import { updateUI, showPopup } from "../../src/js/ui.js";

describe("updateUI", () => {
  it("updates DOM correctly", () => {
    const elements = {
      tipAmount: document.createElement("span"),
      total: document.createElement("span"),
      totalTipPopup: document.createElement("span"),
      totalAmountPopup: document.createElement("span"),
    };

    updateUI(elements, {
      tipPerPerson: 5,
      billPerPerson: 55,
      tipAmount: 10,
      totalAmount: 110,
    });

    expect(elements.tipAmount.textContent).toBe("5.00");
    expect(elements.total.textContent).toBe("55.00");
  });

  it("shows popup", () => {
    const popup = document.createElement("div");

    showPopup(popup);

    expect(popup.classList.contains("show")).toBe(true);
  });
});
