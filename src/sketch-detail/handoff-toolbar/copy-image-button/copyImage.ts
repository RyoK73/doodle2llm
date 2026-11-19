import { toast } from "@/design-system/toast";
import { logError } from "@/error-logging";

// Call this inside the click handler, before any `await`. Safari accepts the write only when it starts in the user's action, so the PNG is passed as a promise.
const copyImage = async (blob: Promise<Blob>): Promise<void> => {
  try {
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    toast.add({ type: "success", title: "コピーしました" });
  } catch (error) {
    logError(error, { feature: "copy-image" });
    toast.add({ type: "error", title: "コピーに失敗しました" });
  }
};

export { copyImage };
