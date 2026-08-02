import { messageKeys, t } from "@/i18n/messages";

export const messagesEnKeys = [...messageKeys];

/** Keys that resolve to a non-empty Indonesian string (must match EN set). */
export const messagesIdKeys = messageKeys.filter((key) => t("id", key).trim().length > 0);
