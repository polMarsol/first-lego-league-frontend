"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorAlertProps {
  readonly message: string;
  readonly onRetry?: () => void;
  readonly className?: string;
}

/**
 * Reusable error alert component with optional retry functionality
 * Displays user-friendly error messages with consistent styling
 */
export default function ErrorAlert({ message, onRetry, className }: ErrorAlertProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
      <div className="flex-1">
        <p className="text-sm font-medium text-destructive">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-sm font-medium text-destructive underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
