import { describe, expect, it } from "vitest";
import { messageKeys, t, type MessageKey } from "@/i18n/messages";
import { messagesEnKeys, messagesIdKeys } from "@/i18n/catalogParity";

describe("i18n catalog", () => {
  it("has matching EN and ID keys", () => {
    expect(messagesIdKeys.sort()).toEqual(messagesEnKeys.sort());
    expect(messageKeys.length).toBeGreaterThan(50);
  });

  it("resolves Indonesian nav and shell strings", () => {
    expect(t("id", "nav.identity")).toBe("Identitas");
    expect(t("id", "shell.controlCenter")).toBe("Pusat Kendali");
    expect(t("id", "identity.title")).toBe("Identitas");
  });

  it("interpolates vars", () => {
    const key = "shell.runtimeLabel" as MessageKey;
    expect(t("id", key, { status: "sehat", plugins: 3 })).toContain("3");
  });
});
