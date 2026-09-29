"use client";

import { useActionState } from "react";
import { submitInquiry, type ContactState } from "@/app/contact/actions";
import { ArrowUpRight } from "@/components/ui/Icons";
import { budgets, contactMethods, projectTypes, timelines } from "@/lib/validation/contact";
import { ChoiceGroup, FieldShell, TextInput } from "./Fields";

const initialState: ContactState = { status: "idle" };

/** Conversational project inquiry form, progressively enhanced. */
export function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiry, initialState);

  if (state.status === "sent") {
    return (
      <div role="status" className="panel-enter rounded-[var(--radius-frame)] border border-line p-8 md:p-12">
        <p className="eyebrow text-accent">Message received</p>
        <p className="mt-4 text-display-sm font-medium">Thank you — I&rsquo;ll be in touch soon.</p>
        <p className="mt-4 max-w-lg text-fg-muted">
          I read every inquiry personally and usually reply within a couple of working days.
        </p>
      </div>
    );
  }

  const errors = state.status === "invalid" ? state.errors : {};
  const values = state.status === "invalid" ? state.values : {};

  return (
    <form action={action} noValidate className="grid gap-14">
      {state.status === "unavailable" ? (
        <div role="status" className="rounded-[var(--radius-card)] border border-line p-6">
          <p className="font-medium">The form isn&rsquo;t connected to an inbox yet.</p>
          <p className="mt-2 text-fg-muted">
            Your message is ready — open it in your email app to send it directly.
          </p>
          <a
            href={state.mailto}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-surface"
          >
            Open in email
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      ) : null}
      {state.status === "error" ? (
        <p role="alert" className="rounded-[var(--radius-card)] border border-rose-400/40 p-6 text-fg">
          Something went wrong sending your message. Please try again in a moment.
        </p>
      ) : null}

      {/* Honeypot — hidden from people and assistive technology */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-14 md:grid-cols-2 md:gap-10">
        <FieldShell id="name" label="What's your name?" error={errors.name}>
          <TextInput id="name" name="name" autoComplete="name" placeholder="Your name" defaultValue={values.name} error={errors.name} required />
        </FieldShell>
        <FieldShell id="email" label="Where can I reach you?" error={errors.email}>
          <TextInput id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" defaultValue={values.email} error={errors.email} required />
        </FieldShell>
      </div>

      <FieldShell id="company" label="Company or organisation" optional>
        <TextInput id="company" name="company" autoComplete="organization" placeholder="Where you work, if relevant" defaultValue={values.company} />
      </FieldShell>

      <FieldShell id="building" label="What are you building?" hint="One sentence is perfect." error={errors.building}>
        <TextInput id="building" name="building" placeholder="e.g. An online booking system for my salon" defaultValue={values.building} error={errors.building} hasHint required />
      </FieldShell>

      <FieldShell id="projectType" as="fieldset" label="Which is closest?" error={errors.projectType}>
        <ChoiceGroup name="projectType" options={projectTypes} defaultValue={values.projectType} required />
      </FieldShell>

      <FieldShell id="timeline" as="fieldset" label="When would you like to start?" error={errors.timeline}>
        <ChoiceGroup name="timeline" options={timelines} defaultValue={values.timeline} required />
      </FieldShell>

      <FieldShell id="details" label="Tell me a little more." hint="What problem does it solve, who is it for, and what exists today?" error={errors.details}>
        <TextInput id="details" name="details" multiline placeholder="The more context, the better my first reply will be." defaultValue={values.details} error={errors.details} hasHint required />
      </FieldShell>

      <FieldShell id="budget" as="fieldset" label="Do you have a budget in mind?" optional error={errors.budget}>
        <ChoiceGroup name="budget" options={budgets} defaultValue={values.budget} />
      </FieldShell>

      <FieldShell id="contactMethod" as="fieldset" label="How do you prefer to talk?" error={errors.contactMethod}>
        <ChoiceGroup name="contactMethod" options={contactMethods} defaultValue={values.contactMethod ?? "Email"} required />
      </FieldShell>

      <div className="flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-fg-muted">
          Your details are only used to reply to this inquiry.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-fg px-8 font-medium text-surface transition-opacity disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send inquiry"}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
