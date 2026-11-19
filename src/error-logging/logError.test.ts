import * as Sentry from "@sentry/nextjs";
import { logError } from "@/error-logging";

vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));

const FEATURE = "save-sketch";

const getCapturedCall = () => {
  const [exception, captureContext] = vi.mocked(Sentry.captureException).mock
    .calls[0];
  return { exception, captureContext };
};

const getWrappedError = () => getCapturedCall().exception as Error;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("logError", () => {
  it("should pass the same `Error` instance to Sentry when an `Error` is given", () => {
    const error = new Error("boom");

    logError(error, { feature: FEATURE });

    expect(Sentry.captureException).toHaveBeenCalledOnce();
    expect(getCapturedCall().exception).toBe(error);
  });

  it("should pass the same instance to Sentry without wrapping when a subclass of `Error` is given", () => {
    const error = new TypeError("boom");

    logError(error, { feature: FEATURE });

    expect(getCapturedCall().exception).toBe(error);
  });

  it("should put the given feature on the tag `feature`", () => {
    logError(new Error("boom"), { feature: "save-sketch" });

    expect(getCapturedCall().captureContext).toEqual(
      expect.objectContaining({ tags: { feature: "save-sketch" } }),
    );
  });

  it('should send with the level "error" when the level is omitted', () => {
    logError(new Error("boom"), { feature: FEATURE });

    expect(getCapturedCall().captureContext).toEqual(
      expect.objectContaining({ level: "error" }),
    );
  });

  it('should send with the level "warning" when the level "warning" is given', () => {
    logError(new Error("boom"), { feature: FEATURE, level: "warning" });

    expect(getCapturedCall().captureContext).toEqual(
      expect.objectContaining({ level: "warning" }),
    );
  });

  const plainObject = { code: 1 };

  it.each([
    { label: "a string", value: "boom", message: "boom" },
    {
      label: "a plain object",
      value: plainObject,
      message: String(plainObject),
    },
    { label: "null", value: null, message: "null" },
    { label: "undefined", value: undefined, message: "undefined" },
  ])(
    "should wrap $label in an `Error` that has $message as the message and the given value as the cause",
    ({ value, message }) => {
      logError(value, { feature: FEATURE });

      const wrapped = getWrappedError();
      expect(wrapped).toBeInstanceOf(Error);
      expect(wrapped.message).toBe(message);
      expect(wrapped.cause).toBe(value);
    },
  );
});
