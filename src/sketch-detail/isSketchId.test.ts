import { isSketchId } from "@/sketch-detail/isSketchId";

describe("isSketchId", () => {
  test("should return true when the id is a valid uuid", () => {
    expect(isSketchId("11111111-1111-4111-8111-111111111111")).toBe(true);
  });

  test.each([
    { description: "is not a uuid", id: "not-a-uuid" },
    { description: "is an empty string", id: "" },
    {
      description: "is a uuid with spaces around it",
      id: " 11111111-1111-4111-8111-111111111111 ",
    },
    {
      description: "is a uuid without hyphens",
      id: "11111111111141118111111111111111",
    },
  ])("should return false when the id $description", ({ id }) => {
    expect(isSketchId(id)).toBe(false);
  });
});
