import { describe, it, expect } from "vitest";
import { showError } from "../../src/js/ui.js";

describe("showError", () => {
  it("adds error class", () => {
    const input = document.createElement("input");

    const elements = {
      bill: input,
    };

    showError(elements, "bill", "Error");

    expect(input.classList.contains("calculator__input--error")).toBe(true);
  });

  it("sets error message text", () => {
    document.body.innerHTML = `
      <label for="bill"></label>
      <p class="hide"></p>
    `;

    const input = document.createElement("input");

    const elements = {
      bill: input,
    };

    showError(elements, "bill", "Can't be zero!");

    const error = document.querySelector("p");

    expect(error.textContent).toBe("Can't be zero!");
  });
});
