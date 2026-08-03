"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({ name: "", email: "", message: "", consent: false });

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.email.trim() || !EMAIL_RE.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) nextErrors.message = "Please add a short message.";
    if (!values.consent) {
      nextErrors.consent = "Please confirm you agree to the Privacy Policy.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const res = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="surface-container flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        <h3 className="text-lg font-semibold">Message sent</h3>
        <p className="text-sm text-[var(--container-muted)]">
          Thanks for reaching out. We&apos;ll get back to you within a couple of business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(
            "rounded-lg bg-[var(--foreground)]/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--container)]",
            errors.name && "ring-2 ring-red-500"
          )}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(
            "rounded-lg bg-[var(--foreground)]/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--container)]",
            errors.email && "ring-2 ring-red-500"
          )}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            "rounded-lg bg-[var(--foreground)]/5 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--container)]",
            errors.message && "ring-2 ring-red-500"
          )}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--container)]"
          />
          <span>
            I agree to the{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--container)]">
              Privacy Policy
            </Link>{" "}
            and consent to my details being sent to our form provider to process this enquiry.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="text-xs text-red-500">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-500">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong sending your message. Please try again, or email{" "}
          {siteConfig.email} directly.
        </div>
      )}

      <Button type="submit" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
