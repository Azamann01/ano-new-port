import {
  Search,
  Workflow,
  AppWindow,
  LayoutDashboard,
  RefreshCw,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types";

const icons: Record<string, LucideIcon> = {
  Search,
  Workflow,
  AppWindow,
  LayoutDashboard,
  RefreshCw,
  Rocket,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon] ?? Workflow;

  return (
    <div className="surface-container flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold">{service.title}</h3>
      <p className="text-sm text-[var(--container-muted)]">{service.description}</p>
    </div>
  );
}
