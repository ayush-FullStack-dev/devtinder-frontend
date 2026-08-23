import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("exports a homepage for server rendering", () => {
    expect(HomePage).toBeTypeOf("function");
  });
});
