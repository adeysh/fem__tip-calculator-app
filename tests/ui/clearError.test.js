import { describe, it, expect } from "vitest";
import { clearError } from "../../src/js/ui.js";

describe("clearError", () => {
  it("removes error class when input is valid", () => {
    const input = document.createElement("input");
    input.value = "10";
    input.classList.add("calculator__input--error");

    const wrapper = document.createElement("div");
    const errorText = document.createElement("p");
    wrapper.appendChild(input);
    wrapper.appendChild(errorText);

    clearError(input);

    expect(input.classList.contains("calculator__input--error")).toBe(false);
  });

  it("does NOT remove error for invalid input", () => {
    const input = document.createElement("input");
    input.value = "0";
    input.classList.add("calculator__input--error");

    clearError(input);

    expect(input.classList.contains("calculator__input--error")).toBe(true);
  });
});
