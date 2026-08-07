import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  level?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = "h2",
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          {eyebrow}
        </span>
      )}
      <Heading
        className={cn(
          level === "h1"
            ? "text-4xl font-bold tracking-tight sm:text-5xl"
            : "text-3xl font-bold tracking-tight sm:text-4xl",
          titleClassName
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
