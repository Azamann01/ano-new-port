import { Workflow, LayoutDashboard, Plug, AppWindow, Check, type LucideIcon } from "lucide-react";
import type { Service } from "@/types";

const icons: Record<string, LucideIcon> = {
  Workflow,
  LayoutDashboard,
  Plug,
  AppWindow,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon] ?? Workflow;

  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-[var(--border)] p-6">
      <div className="gradient-bg flex h-11 w-11 items-center justify-center rounded-xl text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold">{service.title}</h3>
      <p className="text-sm text-[var(--muted)]">{service.description}</p>
      <ul className="mt-auto flex flex-col gap-2 pt-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
