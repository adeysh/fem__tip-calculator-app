import { describe, it, expect } from "vitest";
import { validateInputs } from "../../src/js/logic.js";

describe("validateInputs", () => {
  it("fails when bill is zero", () => {
    const result = validateInputs({ bill: 0, tip: 10, people: 2 });

    expect(result.field).toBe("bill");
  });

  it("fails when people is zero", () => {
    const result = validateInputs({ bill: 100, tip: 10, people: 0 });

    expect(result.field).toBe("people");
  });

  it("fails on NaN", () => {
    const result = validateInputs({
      bill: NaN,
      tip: 10,
      people: 2,
    });

    expect(result.field).toBe("bill");
  });

  it("passes valid input", () => {
    const result = validateInputs({
      bill: 100,
      tip: 10,
      people: 2,
    });

    expect(result.field).toBe(null);
  });

  it("fails for negative bill", () => {
    const result = validateInputs({
      bill: -100,
      tip: 10,
      people: 2,
    });

    expect(result.field).toBe("bill");
  });

  it("fails for negative people", () => {
    const result = validateInputs({
      bill: 100,
      tip: 10,
      people: -2,
    });

    expect(result.field).toBe("people");
  });

  it("fails when custom tip is invalid", () => {
    const result = validateInputs({
      bill: 100,
      tip: 0,
      people: 2,
      isCustomTip: true,
    });

    expect(result.field).toBe("custom-tip");
  });
});
