import { describe, it, expect } from "vitest";
import { calculateBill } from "../../src/js/logic.js";

describe("calculateBill", () => {
  it("calculates correct values", () => {
    const result = calculateBill({
      bill: 100,
      tip: 10,
      people: 2,
    });

    expect(result.tipAmount).toBe(10);
    expect(result.totalAmount).toBe(110);
    expect(result.tipPerPerson).toBe(5);
    expect(result.billPerPerson).toBe(55);
  });

  it("handles decimals", () => {
    const result = calculateBill({
      bill: 99.99,
      tip: 12.5,
      people: 3,
    });

    expect(result.tipPerPerson).toBeCloseTo(4.17, 2);
  });

  it("handles zero bill", () => {
    const result = calculateBill({
      bill: 0,
      tip: 10,
      people: 2,
    });

    expect(result.tipPerPerson).toBe(0);
  });

  it("handles one person", () => {
    const result = calculateBill({
      bill: 100,
      tip: 10,
      people: 1,
    });

    expect(result.billPerPerson).toBe(110);
  });
});
