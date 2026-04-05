import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  readonly title: string;
  readonly description?: string;
  readonly className?: string;
  readonly action?: React.ReactNode;
}

/**
 * Reusable empty state component for displaying "no data" messages
 * Uses neutral styling to distinguish from error states
 */
export default function EmptyState({ title, description, className, action }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-border bg-background/80 px-6 py-12 text-center",
        className
      )}
    >
      <Info className="mb-3 h-10 w-10 text-muted-foreground/60" aria-hidden="true" />
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
