import { generateSketchMetadata } from "@/sketch-detail/generateSketchMetadata";
import { isSketchId } from "@/sketch-detail/isSketchId";
import { getSketch } from "@/supabase/sketch-crud/getSketch";
import { createSupabaseServerClient } from "@/supabase/utils/serverClient";
import { logError } from "@/error-logging";

const validId = "11111111-1111-4111-8111-111111111111";

vi.mock("@/error-logging", () => ({ logError: vi.fn() }));
vi.mock("@/supabase/utils/serverClient", () => ({
  createSupabaseServerClient: vi.fn(),
}));
vi.mock("@/supabase/sketch-crud/getSketch", () => ({ getSketch: vi.fn() }));
vi.mock("@/sketch-detail/isSketchId", () => ({ isSketchId: vi.fn() }));

const createSketch = (title: string) => ({
  id: validId,
  title,
  description: "",
  width: 1920,
  height: 1080,
  created_at: "2026-10-01T00:00:00Z",
  updated_at: "2026-10-02T00:00:00Z",
  canvas_json: {},
  cell_size: 32,
  frame_id: null,
  fabric_version: "7.4.0",
});

describe("generateSketchMetadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isSketchId).mockReturnValue(true);
    vi.mocked(createSupabaseServerClient).mockResolvedValue(
      {} as Awaited<ReturnType<typeof createSupabaseServerClient>>,
    );
  });

  describe("when isSketchId returns false", () => {
    test("should return no title without calling getSketch", async () => {
      vi.mocked(isSketchId).mockReturnValue(false);

      expect(await generateSketchMetadata(validId)).toEqual({});
      expect(isSketchId).toHaveBeenCalledWith(validId);
      expect(getSketch).not.toHaveBeenCalled();
    });
  });

  describe("when getSketch returns ok: true", () => {
    test.each([
      {
        description: "should return the title of the sketch",
        title: "my sketch",
        expected: { title: "my sketch" },
      },
      {
        description: "should return no title when the title is an empty string",
        title: "",
        expected: {},
      },
      {
        description:
          "should return no title when the title has only half-width spaces",
        title: "   ",
        expected: {},
      },
      {
        description:
          "should return no title when the title has only full-width spaces",
        title: "　　",
        expected: {},
      },
      {
        description: "should return a title of 100 characters as it is",
        title: "a".repeat(100),
        expected: { title: "a".repeat(100) },
      },
    ])("$description", async ({ title, expected }) => {
      vi.mocked(getSketch).mockResolvedValue({
        ok: true,
        value: createSketch(title),
      });

      expect(await generateSketchMetadata(validId)).toEqual(expected);
    });

    test("should return no title when getSketch returns null", async () => {
      vi.mocked(getSketch).mockResolvedValue({ ok: true, value: null });

      expect(await generateSketchMetadata(validId)).toEqual({});
    });
  });

  describe("when getSketch returns ok: false", () => {
    test("should return no title without throwing, and leave the logging to SketchDetail", async () => {
      vi.mocked(getSketch).mockResolvedValue({
        ok: false,
        error: new Error("test error"),
      });

      await expect(generateSketchMetadata(validId)).resolves.toEqual({});
      expect(logError).not.toHaveBeenCalled();
    });
  });
});
