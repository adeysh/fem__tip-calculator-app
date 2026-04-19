import { describe, it, expect } from "vitest";
import { parseFormData } from "../../src/js/logic.js";

describe("parseFormData", () => {
  it("uses custom tip when provided", () => {
    const result = parseFormData({
      bill: "100",
      "custom-tip": "15",
      options: "10",
      people: "2",
    });

    expect(result.tip).toBe(15);
    expect(result.isCustomTip).toBe(true);
  });

  it("uses selected tip when custom is empty", () => {
    const result = parseFormData({
      bill: "100",
      "custom-tip": "",
      options: "10",
      people: "2",
    });

    expect(result.tip).toBe(10);
    expect(result.isCustomTip).toBe(false);
  });

  it("trims input values", () => {
    const result = parseFormData({
      bill: " 100 ",
      "custom-tip": " ",
      options: "10",
      people: " 2 ",
    });

    expect(result.bill).toBe(100);
    expect(result.people).toBe(2);
  });
});
