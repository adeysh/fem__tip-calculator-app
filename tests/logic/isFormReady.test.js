import { describe, it, expect } from "vitest";
import { isFormReady } from "../../src/js/logic.js";

describe("isFormReady", () => {
  it("returns true when all values exist", () => {
    const result = isFormReady({
      bill: "100",
      people: "2",
      selectedTip: "10",
      customTip: "",
    });

    expect(result).toBe(true);
  });

  it("returns false when bill missing", () => {
    const result = isFormReady({
      bill: "",
      people: "2",
      selectedTip: "10",
      customTip: "",
    });

    expect(result).toBe(false);
  });
});
