import type { ReactNode } from "react";

interface FormContainerProps {
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
}

export function FormContainer({ titulo, subtitulo, children }: FormContainerProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8 w-full max-w-lg mx-auto">
      <h2
        className="font-bold text-foreground mb-1"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.4rem" }}
      >
        {titulo}
      </h2>
      {subtitulo && <p className="text-muted-foreground text-sm mb-6">{subtitulo}</p>}
      {children}
    </div>
  );
}

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

export function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  hint,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

export function SelectField({ label, value, onChange, options, required }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function TextareaField({ label, value, onChange, placeholder, rows = 4, required }: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-input-background border border-border rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
      />
    </div>
  );
}
