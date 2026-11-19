import * as Sentry from "@sentry/nextjs";

// `ErrorLogFeature` is the name of the operation in which the error occurred, such as saving a sketch or copying an image.
// `logError` attaches it to the Sentry event as the tag `feature`, so that you can tell in Sentry which operation failed.
type ErrorLogFeature =
  | "save-sketch"
  | "save-sketch-meta"
  | "revalidate-sketch-list"
  | "load-sketch"
  | "restore-history"
  | "copy-image"
  | "download-image";

type LogErrorOptions = {
  feature: ErrorLogFeature;
  level?: "error" | "warning";
};

// A value that is not an `Error` has no stack trace, so wrap it. The original value stays in `cause`.
const toError = (value: unknown): Error =>
  value instanceof Error ? value : new Error(String(value), { cause: value });

// logError sends the error to Sentry with the feature as the tag and the level.
const logError = (
  error: unknown,
  { feature, level = "error" }: LogErrorOptions,
): void => {
  Sentry.captureException(toError(error), { tags: { feature }, level });
};

export { logError };
export type { ErrorLogFeature };
