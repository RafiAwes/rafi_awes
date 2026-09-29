"use server";

import { siteConfig } from "@/config/site";
import {
  parseContactForm,
  type ContactField,
  type ContactInquiry,
} from "@/lib/validation/contact";

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<ContactField, string>>; values: Record<string, string> }
  | { status: "sent" }
  | { status: "unavailable"; mailto: string }
  | { status: "error" };

function toMailto(inquiry: ContactInquiry): string {
  const body = [
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company || "—"}`,
    `Building: ${inquiry.building}`,
    `Type: ${inquiry.projectType}`,
    `Timeline: ${inquiry.timeline}`,
    `Budget: ${inquiry.budget || "—"}`,
    `Preferred contact: ${inquiry.contactMethod}`,
    "",
    inquiry.details,
  ].join("\n");
  const subject = `Project inquiry — ${inquiry.building}`.slice(0, 120);
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Validates an inquiry and forwards it to CONTACT_WEBHOOK_URL (any endpoint
 * accepting JSON — an automation tool, CRM or email service). Without a
 * webhook configured, the visitor is offered a pre-filled email instead, so
 * the form never pretends a message was delivered when it was not.
 */
export async function submitInquiry(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get("website") ?? "").length > 0) return { status: "sent" };

  const result = parseContactForm(formData);
  if (!result.ok) {
    const values: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string" && key !== "website") values[key] = value;
    });
    return { status: "invalid", errors: result.errors, values };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return { status: "unavailable", mailto: toMailto(result.data) };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...result.data, receivedAt: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    return { status: "sent" };
  } catch (error) {
    console.error("Contact inquiry delivery failed", error);
    return { status: "error" };
  }
}
