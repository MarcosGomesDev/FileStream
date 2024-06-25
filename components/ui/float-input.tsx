import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: unknown;
}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <Input
        placeholder=" "
        className={cn("peer", error ? "!border-red-500" : "", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
FloatingInput.displayName = "FloatingInput";

interface FloatingLabelProps
  extends React.ComponentPropsWithoutRef<typeof Label> {
  error?: unknown;
}

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FloatingLabelProps
>(({ className, error, ...props }, ref) => {
  return (
    <Label
      className={cn(
        "peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 !ring-0 duration-300 focus:ring-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary dark:bg-background dark:peer-focus:text-slate-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
        error ? "!border-red-500 !text-red-500" : "",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

export type FloatingLabelInputProps = InputProps & {
  label?: string;
  error?: unknown;
};

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, error, ...props }, ref) => {
  return (
    <div className="relative">
      <FloatingInput error={error} ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id} error={error}>
        {label}
      </FloatingLabel>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };
