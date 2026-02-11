import { toast } from 'sonner@2.0.3';

/**
 * Fallback copy method using document.execCommand for sandboxed iframe environments.
 */
function fallbackCopy(text: string): boolean {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

/**
 * Copies text to clipboard with toast notification.
 * Uses Clipboard API with execCommand fallback for sandboxed environments.
 * 
 * @param text - The text to copy
 * @param label - Optional label for the toast message (e.g., "CSS variables")
 */
export function copyToClipboard(text: string, label?: string) {
  const successMsg = label ? `Copied ${label} to clipboard` : "Copied!";
  const errorMsg = "Failed to copy. Please copy manually.";

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => toast.success(successMsg))
        .catch(() => {
          if (fallbackCopy(text)) {
            toast.success(successMsg);
          } else {
            toast.error(errorMsg);
          }
        });
    } else {
      if (fallbackCopy(text)) {
        toast.success(successMsg);
      } else {
        toast.error(errorMsg);
      }
    }
  } catch {
    if (fallbackCopy(text)) {
      toast.success(successMsg);
    } else {
      toast.error(errorMsg);
    }
  }
}
