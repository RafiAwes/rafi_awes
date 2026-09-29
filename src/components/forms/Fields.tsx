import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  as?: "div" | "fieldset";
}

/** Label, hint and error around a control. Uses fieldset/legend for groups. */
export function FieldShell({ id, label, hint, error, optional, children, as = "div" }: FieldShellProps) {
  const Wrapper = as;
  const LabelTag = as === "fieldset" ? "legend" : "label";

  return (
    <Wrapper className="grid gap-3" aria-describedby={as === "fieldset" && error ? `${id}-error` : undefined}>
      <LabelTag
        {...(as === "div" ? { htmlFor: id } : {})}
        className="text-[clamp(1.25rem,2vw,1.5rem)] font-medium tracking-[-0.025em]"
      >
        {label}
        {optional ? <span className="ml-2 text-sm font-normal text-fg-subtle">optional</span> : null}
      </LabelTag>
      {hint ? <p id={`${id}-hint`} className="-mt-1 text-sm text-fg-muted">{hint}</p> : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-rose-400" role="alert">
          {error}
        </p>
      ) : null}
    </Wrapper>
  );
}

const inputBase =
  "w-full border-b border-line-strong bg-transparent py-3 text-lg text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-fg aria-[invalid=true]:border-rose-400";

interface TextInputProps {
  id: string;
  name: string;
  type?: "text" | "email";
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  hasHint?: boolean;
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
}

export function TextInput({
  id,
  name,
  type = "text",
  placeholder,
  defaultValue,
  error,
  hasHint,
  autoComplete,
  required,
  multiline,
}: TextInputProps) {
  const describedBy = [hasHint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const shared = {
    id,
    name,
    placeholder,
    defaultValue,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };

  return multiline ? (
    <textarea {...shared} rows={5} className={cn(inputBase, "resize-y leading-relaxed")} />
  ) : (
    <input {...shared} type={type} autoComplete={autoComplete} className={inputBase} />
  );
}

interface ChoiceGroupProps {
  name: string;
  options: readonly string[];
  defaultValue?: string;
  required?: boolean;
}

/** Radio group styled as selectable chips. Native radios keep keyboard support. */
export function ChoiceGroup({ name, options, defaultValue, required }: ChoiceGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <label key={option} className="relative cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option}
            defaultChecked={defaultValue === option}
            required={required}
            className="peer sr-only"
          />
          <span className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm text-fg-muted transition-colors duration-300 hover:border-fg/50 hover:text-fg peer-checked:border-fg peer-checked:bg-fg peer-checked:text-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}
